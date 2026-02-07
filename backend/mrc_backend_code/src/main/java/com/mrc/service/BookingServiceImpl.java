package com.mrc.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
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

        // ---------- 1) BASIC VALIDATION ----------
        if (dto.getJourneyDate().isBefore(LocalDate.now())) {
            throw new InvalidInputException("Journey date cannot be in the past");
        }

        // ---------- 2) FETCH TRAIN ----------
        TrainEntity train = trainRepository.findById(dto.getTrainId())
                .orElseThrow(() -> new ResourceNotFoundException("Train not found"));

        // ---------- 3) VALIDATE SEAT PRICE ----------
        SeatPrice price = seatPriceRepository.findById(dto.getSeatPriceId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid seat price"));

        if (!price.getTrain().equals(train) ||
            !price.getCoachType().equals(dto.getCoachType()) ||
            !price.getQuota().equals(dto.getReservationQuota())) {
            throw new InvalidInputException("Seat price mismatch with request");
        }

        // ---------- 4) FETCH COACH ----------
        Coach coach = coachRepository
                .findFirstByTrainAndCoachType(train, dto.getCoachType())
                .orElseThrow(() ->
                        new ResourceNotFoundException("No coach available for selected type"));

        // ---------- 5) HOW MANY SEATS NEEDED? ----------
        int requiredSeats = dto.getPassengers().size();

        // ---------- 6) LOCK & FETCH AVAILABLE SEATS ----------
        List<SeatAvailability> seats = seatRepository
                .findAvailableSeatsForUpdate(
                        coach,
                        SeatStatus.AVAILABLE,
                        dto.getReservationQuota(),
                        dto.getJourneyDate(),
                        PageRequest.of(0, requiredSeats)
                );

        // ---------- 7) CREATE BOOKING (ONCE) ----------
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
        booking.setRazorpayPaymentId(dto.getRazorpayPaymentId());
        booking.setTotalFare(price);
        booking.setPnr(
                pnrGenerator.generate(train.getTrainNumber(), dto.getJourneyDate())
        );

        // ---------- 8) CONFIRMED OR WAITLIST ----------
        if (seats.size() >= requiredSeats) {

            // Mark required seats as booked
            for (int i = 0; i < requiredSeats; i++) {
                seats.get(i).setBooked(SeatStatus.BOOKED);
            }
            seatRepository.saveAll(seats.subList(0, requiredSeats));

            booking.setBookingStatus(BookingStatus.CONFIRMED);

            // 🔥 IMPORTANT: attach a seat to booking for cancellation logic
            booking.setSeat(seats.get(0));

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

        // ---------- 9) SAVE BOOKING ----------
        Booking savedBooking = bookingRepository.save(booking);

        loggerClient.log(
            "Booking created. BookingId=" + savedBooking.getId() +
            ", PNR=" + savedBooking.getPnr()
        );

        // ---------- 10) SAVE PASSENGERS ----------
        List<Passenger> passengerList = new ArrayList<>();

        for (int i = 0; i < dto.getPassengers().size(); i++) {

            PassengerDto pDto = dto.getPassengers().get(i);
            Passenger p = new Passenger();

            p.setName(pDto.getName());
            p.setAge(pDto.getAge());
            p.setGender(pDto.getGender());
            p.setBooking(savedBooking);

            if (savedBooking.getBookingStatus() == BookingStatus.CONFIRMED
                    && i < seats.size()) {

                SeatAvailability assignedSeat = seats.get(i);

                p.setSeatNo(assignedSeat.getId().toString());
                p.setCoachNo(coach.getCoachNo());
                p.setSeatLabel(
                        coach.getCoachNo() + "-" + assignedSeat.getId()
                );
            }

            passengerList.add(p);
        }

        passengerRepository.saveAll(passengerList);
        savedBooking.setPassengers(passengerList);

        // ---------- 11) RETURN DTO ----------
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

        return bookingMapper.toDto(booking);
    }

    // ================== CANCEL BY ADMIN ==================

    public BookingResponseDto cancelByAdmin(Long bookingId) {

        Booking booking = bookingRepository
                .findByIdForUpdate(bookingId)
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

        return bookingMapper.toDto(booking);
    }

    // ================== WAITLIST PROMOTION ==================

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    private void promoteWaitlist(
            TrainEntity train,
            LocalDate journeyDate,
            SeatAvailability freedSeat
    ) {

        Booking wlBooking = bookingRepository
            .findFirstWaitlistForUpdate(
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

    // ================== GET BOOKINGS FOR USER ==================

    @Override
    public List<BookingResponseDto> getBookingsForUser(UserEntity user) {

        List<Booking> bookings =
                bookingRepository.findByUserOrderByBookedOnDesc(user);

        return bookings.stream()
                .map(bookingMapper::toDto)
                .toList();
    }
}
