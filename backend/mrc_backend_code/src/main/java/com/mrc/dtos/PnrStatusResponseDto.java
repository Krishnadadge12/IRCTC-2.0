package com.mrc.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.mrc.entities.BookingStatus;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PnrStatusResponseDto {

	private String pnr;

    private String trainName;
    private String trainNumber;

    private String source;          // From
    private String destination;     // To
    private LocalDate journeyDate;  // Departure Date

    private String reservationQuota;
    private String coachType;

    private BookingStatus bookingStatus;
    private LocalDateTime bookedOn;

    private List<PassengerResponseDto> passengers;
}
