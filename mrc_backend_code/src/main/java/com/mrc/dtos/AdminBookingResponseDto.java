package com.mrc.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.mrc.entities.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AdminBookingResponseDto {

    private Long bookingId;
    private String pnr;
    private BookingStatus status;

    private LocalDate journeyDate;
    private String quota;

    private String coachNo;
    private String seatLabel;

    private BigDecimal fareAmount;

    private int passengerCount;
    private String userEmail;
}
