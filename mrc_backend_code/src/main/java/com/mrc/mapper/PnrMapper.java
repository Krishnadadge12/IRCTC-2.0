package com.mrc.mapper;


import java.util.List;

import org.springframework.stereotype.Component;

import com.mrc.dtos.PassengerResponseDto;
import com.mrc.dtos.PnrStatusResponseDto;
import com.mrc.entities.Booking;
import com.mrc.entities.passenger.Passenger;

@Component
public class PnrMapper {

    public PnrStatusResponseDto toDto(Booking booking) {

        PnrStatusResponseDto dto = new PnrStatusResponseDto();

        // ---------- Booking level ----------
        dto.setPnr(booking.getPnr());

        dto.setTrainNumber(
            String.valueOf(booking.getTrain().getTrainNumber())
        );
        dto.setTrainName(booking.getTrain().getTrainName());

        dto.setSource(booking.getSource());              // ✅ FIXED
        dto.setDestination(booking.getDestination());   // ✅ FIXED
        dto.setJourneyDate(booking.getJourneyDate());   // ✅ FIXED

        dto.setReservationQuota(
            booking.getTotalFare().getQuota().name()
        );
        dto.setCoachType(
            booking.getCoach().getCoachType().name()
        );

        dto.setBookingStatus(booking.getBookingStatus());
        dto.setBookedOn(booking.getBookedOn());

        // ---------- Passengers ----------
        List<PassengerResponseDto> passengers =
            booking.getPassengers()
                   .stream()
                   .map(this::toPassengerDto)
                   .toList();

        dto.setPassengers(passengers);

        return dto;
    }

    private PassengerResponseDto toPassengerDto(Passenger p) {

    	PassengerResponseDto pd = new PassengerResponseDto();

    	pd.setFullName(p.getName());
    	pd.setAge(p.getAge());
    	pd.setGender(p.getGender().name());

    	pd.setBerthPreference(p.getBerthPreference());
    	pd.setPhone(p.getPhone());
    	pd.setEmail(p.getEmail());

    	pd.setSeatNo(p.getSeatNo());
    	pd.setCoachNo(p.getCoachNo());
    	pd.setSeatLabel(p.getSeatLabel());

        return pd;
    }
}

