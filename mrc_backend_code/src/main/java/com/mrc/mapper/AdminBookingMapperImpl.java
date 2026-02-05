package com.mrc.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.mrc.dtos.AdminBookingResponseDto;
import com.mrc.entities.Booking;

@Component
public class AdminBookingMapperImpl implements AdminBookingMapper {

    @Override
    public AdminBookingResponseDto toDto(Booking b) {

        String seatLabel = null;
        String coachNo = null;

        if (b.getSeat() != null && b.getCoach() != null) {
            coachNo = b.getCoach().getCoachNo();
            seatLabel = coachNo + "-" + b.getSeat().getId();
        }

        return new AdminBookingResponseDto(
                b.getId(),
                b.getPnr(),
                b.getBookingStatus(),
                b.getJourneyDate(),
                b.getTotalFare().getQuota().name(),
                coachNo,
                seatLabel,
                b.getTotalFare().getPrice(),
                b.getPassengers() != null ? b.getPassengers().size() : 0,
                b.getUser().getEmail()
        );
    }

    @Override
    public List<AdminBookingResponseDto> toDtoList(List<Booking> bookings) {
        return bookings.stream()
                .map(this::toDto)
                .toList();
    }
}
