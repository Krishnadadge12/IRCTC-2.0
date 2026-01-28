package com.mrc.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    // ================== CREATE BOOKING ==================

    @Override
    public BookingResponseDto createBooking(UserEntity user, BookingRequestDto dto) {

        TrainEntity train = trainRepository.findById(dto.getTrainId())
                .orElseThrow(() -> new RuntimeException("Train not found"));

        Coach coach = coachRepository.findById(dto.getCoachId())
                .orElseThrow(() -> new RuntimeException("Coach not found"));

        SeatPrice price = seatPriceRepository.findById(dto.getSeatPriceId())
                .orElseThrow(() -> new RuntimeException("Seat price not found"));

        if (!coach.getCoachType().equals(price.getCoachType())) {
            throw new RuntimeException("Coach type mismatch with fare");
        }

        SeatAvailability seat = seatRepository
                .findFirstByCoachAndBookedAndQuota(
                        coach,
                        SeatStatus.AVAILABLE,
                        price.getQuota()
                )
                .orElse(null);

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
                pnrGenerator.generate(
                        train.getTrainNumber(),
                        dto.getJourneyDate()
                )
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

        String seatLabel = null;
        if (savedBooking.getBookingStatus() == BookingStatus.CONFIRMED) {
            seatLabel =
                    savedBooking.getCoach().getCoachNo()
                    + "-"
                    + savedBooking.getSeat().getId();
        }

        List<Passenger> passengerList = new ArrayList<>();

        for (PassengerDto pDto : dto.getPassengers()) {
            Passenger p = new Passenger();
            p.setName(pDto.getName());
            p.setAge(pDto.getAge());
            p.setGender(pDto.getGender());

            if (savedBooking.getBookingStatus() == BookingStatus.CONFIRMED) {
                p.setSeatNo(savedBooking.getSeat().getId().toString());
                p.setCoachNo(savedBooking.getCoach().getCoachNo());
                p.setSeatLabel(seatLabel);
            }

            p.setBooking(savedBooking);
            passengerList.add(p);
        }

        passengerRepository.saveAll(passengerList);
        savedBooking.setPassengers(passengerList);

        // ✅ MAP WHILE TRANSACTION IS OPEN
        return bookingMapper.toDto(savedBooking);
    }

    // ================== CANCEL BOOKING (USER) ==================

    @Override
    public BookingResponseDto cancelBooking(Long bookingId, UserEntity user) {

        Booking booking = bookingRepository
                .findByIdAndUser_Id(bookingId, user.getId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getBookingStatus() == BookingStatus.CANCELLED) {
            throw new RuntimeException("Booking already cancelled");
        }

        SeatAvailability freedSeat = booking.getSeat();

        booking.setBookingStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);

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

    // ================== CANCEL BY ADMIN ==================

    @Override
    public BookingResponseDto cancelByAdmin(Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getBookingStatus() == BookingStatus.CANCELLED) {
            throw new RuntimeException("Already cancelled");
        }

        SeatAvailability freedSeat = booking.getSeat();

        booking.setBookingStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);

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
}
