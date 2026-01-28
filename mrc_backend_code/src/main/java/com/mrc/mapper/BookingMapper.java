package com.mrc.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.mrc.dtos.BookingResponseDto;
import com.mrc.dtos.PassengerDto;
import com.mrc.entities.Booking;
import com.mrc.entities.passenger.Passenger;

@Component
public class BookingMapper {

    public BookingResponseDto toDto(Booking booking) {

        BookingResponseDto dto = new BookingResponseDto();

        
        // Basic booking info
        dto.setBookingId(booking.getId());
        dto.setPnr(booking.getPnr());
        dto.setStatus(booking.getBookingStatus());
        dto.setJourneyDate(booking.getJourneyDate());
        dto.setSource(booking.getSource());
        dto.setDestination(booking.getDestination());
        dto.setBookedOn(booking.getBookedOn());
        dto.setDeparture(booking.getDeparture());

        // Train details (SAFE – no lazy collection access)
        dto.setTrainNo(booking.getTrain().getTrainNumber());
        dto.setTrainName(booking.getTrain().getTrainName());

        // Coach / Seat details
        if (booking.getCoach() != null) {
            dto.setCoachNo(booking.getCoach().getCoachNo());
        }

        if (booking.getSeat() != null) {
            dto.setSeatLabel(
                booking.getCoach().getCoachNo() + "-" + booking.getSeat().getId()
            );
        }

        // Fare / quota
        if (booking.getTotalFare() != null) {
            dto.setQuota(booking.getTotalFare().getQuota());
            dto.setFareAmount(booking.getTotalFare().getPrice());
        }


        // Passengers
        List<PassengerDto> passengerDtos =
                booking.getPassengers()
                       .stream()
                       .map(this::mapPassenger)
                       .collect(Collectors.toList());

        dto.setPassengers(passengerDtos);

        return dto;
    }

    private PassengerDto mapPassenger(Passenger passenger) {
        PassengerDto dto = new PassengerDto();
        dto.setName(passenger.getName());
        dto.setAge(passenger.getAge());
        dto.setGender(passenger.getGender());
        return dto;
    }
}
