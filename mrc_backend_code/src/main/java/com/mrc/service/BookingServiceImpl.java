package com.mrc.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mrc.custom_exceptions.ApiException;
import com.mrc.custom_exceptions.InvalidInputException;
import com.mrc.custom_exceptions.ResourceNotFoundException;
import com.mrc.dtos.BookingRequestDto;
import com.mrc.dtos.BookingResponseDto;
import com.mrc.dtos.PassengerDto;
import com.mrc.entities.*;
import com.mrc.entities.passenger.Passenger;
import com.mrc.entities.train.*;
import com.mrc.entities.users.UserEntity;
import com.mrc.mapper.BookingMapper;
import com.mrc.repository.*;
import com.mrc.util.PnrGenerator;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final TrainRepository trainRepository;
    private final CoachRepository coachRepository;
    private final SeatAvailabilityRepository seatRepository;
    private final SeatPriceRepository seatPriceRepository;
    private final PassengerRepository passengerRepository;
    private final PnrGenerator pnrGenerator;
    private final BookingMapper bookingMapper;
    private final LoggerClient loggerClient;

    // ================== CREATE BOOKING ==================

    @Override
    
    public BookingResponseDto createBooking(UserEntity user, BookingRequestDto dto) {

        if (dto.getJourneyDate().isBefore(LocalDate.now())) {
            throw new InvalidInputException("Journey date cannot be in the past");
        }

        TrainEntity train = trainRepository.findById(dto.getTrainId())
                .orElseThrow(() -> new ResourceNotFoundException("Train not found"));

        Coach coach = coachRepository
                .findFirstByTrainAndCoachType(
                        train,
                        dto.getCoachType()
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException("No coach available for selected type"));

        SeatPrice price = seatPriceRepository
                .findByTrainAndCoachTypeAndQuota(
                        train,
                        dto.getCoachType(),
                        dto.getReservationQuota()
                )
                .orElseThrow(() ->
                        new ResourceNotFoundException("Fare not defined"));

        if (!coach.getCoachType().equals(price.getCoachType())) {
            throw new InvalidInputException("Coach type mismatch with fare");
        }

        SeatAvailability seat = seatRepository
                .findFirstByCoachAndBookedAndQuota(
                        coach,
                        SeatStatus.AVAILABLE,
                        price.getQuota()
                )
                .orElse(null);

        //  CREATE BOOKING ONCE
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setTrain(train);
        booking.setCoach(coach);
        booking.setSource(dto.getSource());
        booking.setDestination(dto.getDestination());
        booking.setDeparture(dto.getDeparture());
        booking.setArrival(dto.getArrival());
        booking.setJourneyDate(dto.getJourneyDate());
        booking.setBookedOn(LocalDateTime.now());
        booking.setTotalFare(price);
        booking.setPnr(
                pnrGenerator.generate(train.getTrainNumber(), dto.getJourneyDate())
        );

        if (seat != null) {
            seat.setBooked(SeatStatus.BOOKED);
            seatRepository.save(seat);

            booking.setSeat(seat);
            booking.setBookingStatus(BookingStatus.CONFIRMED);
        } else {
            int waitlistNo =
                    bookingRepository.countByTrainAndJourneyDateAndBookingStatus(
                            train,
                            dto.getJourneyDate(),
                            BookingStatus.WAITLIST
                    ) + 1;

            booking.setBookingStatus(BookingStatus.WAITLIST);
            booking.setWaitlistNo(waitlistNo);
        }

        Booking savedBooking = bookingRepository.save(booking);
        loggerClient.log(
        	    "Booking created. BookingId=" + savedBooking.getId() +
        	    ", PNR=" + savedBooking.getPnr()
        	);

        // ✅ SAVE PASSENGERS
        List<Passenger> passengerList = new ArrayList<>();

        for (PassengerDto pDto : dto.getPassengers()) {
            Passenger p = new Passenger();
            p.setName(pDto.getName());
            p.setAge(pDto.getAge());
            p.setGender(pDto.getGender());
            p.setBooking(savedBooking);

            if (savedBooking.getBookingStatus() == BookingStatus.CONFIRMED) {
                p.setSeatNo(savedBooking.getSeat().getId().toString());
                p.setCoachNo(savedBooking.getCoach().getCoachNo());
                p.setSeatLabel(
                        savedBooking.getCoach().getCoachNo() + "-" +
                        savedBooking.getSeat().getId()
                );
            }

            passengerList.add(p);
        }

        passengerRepository.saveAll(passengerList);
        savedBooking.setPassengers(passengerList);

        // ✅ RETURN SINGLE BOOKING
        return bookingMapper.toDto(savedBooking);
    }

    // ================== CANCEL BOOKING (USER) ==================

    @Override
    public BookingResponseDto cancelBooking(Long bookingId, UserEntity user) {

        Booking booking = bookingRepository
                .findByIdAndUser_Id(bookingId, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (booking.getBookingStatus() == BookingStatus.CANCELLED) {
            throw new ApiException("Booking already cancelled");
        }

        SeatAvailability freedSeat = booking.getSeat();

        booking.setBookingStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);

        loggerClient.log(
        	    "Booking cancelled by user. BookingId=" + booking.getId()
        	);

        if (freedSeat != null) {
            freedSeat.setBooked(SeatStatus.AVAILABLE);
            seatRepository.save(freedSeat);

            promoteWaitlist(
                    booking.getTrain(),
                    booking.getJourneyDate(),
                    freedSeat
            );
        }

        //  SAFE MAPPING
        return bookingMapper.toDto(booking);
    }

    // ================== CANCEL BY ADMIN ==================

    @Override
    public BookingResponseDto cancelByAdmin(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (booking.getBookingStatus() == BookingStatus.CANCELLED) {
            throw new ApiException("Already cancelled");
        }

        SeatAvailability freedSeat = booking.getSeat();

        booking.setBookingStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
        loggerClient.log(
        	    "Booking cancelled by admin. BookingId=" + booking.getId()
        	);

        if (freedSeat != null) {
            freedSeat.setBooked(SeatStatus.AVAILABLE);
            seatRepository.save(freedSeat);

            promoteWaitlist(
                    booking.getTrain(),
                    booking.getJourneyDate(),
                    freedSeat
            );
        }

        // ✅ SAFE MAPPING
        return bookingMapper.toDto(booking);
    }

    // ================== WAITLIST PROMOTION ==================

    private void promoteWaitlist(
            TrainEntity train,
            LocalDate journeyDate,
            SeatAvailability freedSeat
    ) {
        Booking wlBooking = bookingRepository
            .findFirstByTrainAndJourneyDateAndBookingStatusAndTotalFare_QuotaOrderByBookedOnAsc(
                train,
                journeyDate,
                BookingStatus.WAITLIST,
                freedSeat.getQuota()
            )
            .orElse(null);

        if (wlBooking == null) return;

        freedSeat.setBooked(SeatStatus.BOOKED);
        seatRepository.save(freedSeat);

        wlBooking.setSeat(freedSeat);
        wlBooking.setCoach(freedSeat.getCoach());
        wlBooking.setBookingStatus(BookingStatus.CONFIRMED);
        wlBooking.setWaitlistNo(null);

        bookingRepository.save(wlBooking);

        String seatLabel =
            freedSeat.getCoach().getCoachNo() + "-" + freedSeat.getId();

        List<Passenger> passengers =
            passengerRepository.findByBooking(wlBooking);

        for (Passenger p : passengers) {
            p.setSeatNo(freedSeat.getId().toString());
            p.setCoachNo(freedSeat.getCoach().getCoachNo());
            p.setSeatLabel(seatLabel);
        }

        passengerRepository.saveAll(passengers);
    }
    public List<BookingResponseDto> getBookingsForUser(UserEntity user) {

        List<Booking> bookings =
                bookingRepository.findByUserOrderByBookedOnDesc(user);

        return bookings.stream()
                .map(bookingMapper::toDto)
                .toList();
    }
}
