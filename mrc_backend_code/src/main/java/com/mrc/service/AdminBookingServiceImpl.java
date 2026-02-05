package com.mrc.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mrc.custom_exceptions.ApiException;
import com.mrc.custom_exceptions.ResourceNotFoundException;
import com.mrc.dtos.AdminBookingResponseDto;
import com.mrc.dtos.BookingResponseDto;
import com.mrc.entities.Booking;
import com.mrc.entities.BookingStatus;
import com.mrc.mapper.AdminBookingMapper;
import com.mrc.mapper.BookingMapper;
import com.mrc.repository.BookingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminBookingServiceImpl implements AdminBookingService {

    private final BookingRepository bookingRepo;
    private final AdminBookingMapper mapper;

    @Override
    public List<AdminBookingResponseDto> getBookingsByTrain(Long trainId) {

        List<Booking> bookings =
        		bookingRepo.findByTrain_Id(trainId);

        if (bookings.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No bookings found for train id " + trainId
            );
        }

        return bookings.stream()
                .map(b -> new AdminBookingResponseDto(
                        b.getId(),
                        b.getPnr(),
                        b.getBookingStatus(),
                        b.getJourneyDate(),
                        b.getTotalFare().getQuota().name(),
                        b.getCoach() != null ? b.getCoach().getCoachNo() : null,
                        b.getSeat() != null
                                ? b.getCoach().getCoachNo() + "-" + b.getSeat().getId()
                                : null,
                        b.getTotalFare().getPrice(),
                        b.getPassengers().size(),
                        b.getUser().getEmail()
                ))
                .toList();
    }


    @Override
    public AdminBookingResponseDto cancelBooking(Long id) {
        Booking b = bookingRepo.findById(id)
                .orElseThrow(()->new ResourceNotFoundException(
                        "Booking not found with id: " + id));
                if (b.getBookingStatus() == BookingStatus.CANCELLED) {
                    throw new ApiException("Booking is already cancelled");
                }
        b.setBookingStatus(BookingStatus.CANCELLED);
        bookingRepo.save(b);
        return mapper.toDto(b);
    }
}

