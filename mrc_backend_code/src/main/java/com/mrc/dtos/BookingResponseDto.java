package com.mrc.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.mrc.entities.BookingStatus;
import com.mrc.entities.train.SeatPrice;
import com.mrc.entities.train.TrainQuota;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponseDto {

    private Long bookingId;
    private String pnr;
    private BookingStatus status;

    private LocalDate journeyDate;
    private String source;
    private String destination;

    private Long trainNo;
    private String trainName;

    private String coachNo;
    private String seatLabel;

    private TrainQuota quota;
    private BigDecimal fareAmount;

    private LocalDateTime departure;
    private LocalDateTime bookedOn;

    private List<PassengerDto> passengers;
}

//quota //dept time 