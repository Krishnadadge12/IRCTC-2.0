package com.mrc.mapper;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.mrc.dtos.BookingResponseDto;
import com.mrc.dtos.PassengerDto;
import com.mrc.entities.Booking;
import com.mrc.entities.passenger.Passenger;

@Component
public class BookingMapper {

    public BookingResponseDto toDto(Booking booking) {

        //  create dto
        BookingResponseDto dto = new BookingResponseDto();

        dto.setBookingId(booking.getId());
        dto.setPnr(booking.getPnr());
        dto.setBookingStatus(booking.getBookingStatus().name());
        dto.setBookedOn(booking.getBookedOn());

        // TRAIN
        dto.setTrainName(booking.getTrain().getTrainName());
        dto.setTrainNumber(booking.getTrain().getTrainNumber());

        // COACH
        dto.setCoachType(booking.getCoach().getCoachType().name());
        dto.setCoachNo(booking.getCoach().getCoachNo());

        // JOURNEY
        dto.setSource(booking.getSource());
        dto.setDestination(booking.getDestination());
        dto.setJourneyDate(booking.getJourneyDate());
        dto.setDeparture(booking.getDeparture());
        dto.setArrival(booking.getArrival());

        // DURATION
        long minutes = Duration.between(
                booking.getDeparture(),
                booking.getArrival()
        ).toMinutes();
        dto.setDuration((minutes / 60) + "h " + (minutes % 60) + "m");

        // FARE
        BigDecimal seatPrice =
                booking.getTotalFare() != null
                        ? booking.getTotalFare().getPrice()
                        : BigDecimal.ZERO;

        dto.setTotalFare(seatPrice);
        dto.setRazorpayPaymentId(booking.getRazorpayPaymentId()); 
        // PASSENGERS
        dto.setPassengers(
            booking.getPassengers()
                   .stream()
                   .map(this::mapPassenger)
                   .collect(Collectors.toList())
        );

        return dto;
    }

    private PassengerDto mapPassenger(Passenger passenger) {
        PassengerDto dto = new PassengerDto();
        dto.setName(passenger.getName());
        dto.setAge(passenger.getAge());
        dto.setGender(passenger.getGender());
        dto.setSeatNo(passenger.getSeatNo());
        dto.setSeatLabel(passenger.getSeatLabel());
        return dto;
    }
}
