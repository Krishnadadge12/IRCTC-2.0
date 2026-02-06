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
	    private String bookingStatus;
	    private LocalDateTime bookedOn;

	    // TRAIN
	    private String trainName;
	    private Long trainNumber;

	    // COACH
	    private String coachType;
	    private String coachNo;

	    // JOURNEY
	    private String source;
	    private String destination;
	    private LocalDate journeyDate;
	    private LocalDateTime departure;
	    private LocalDateTime arrival;
	    private String duration;

	    // FARE
	    private BigDecimal totalFare;

	    // PASSENGERS
	    private List<PassengerDto> passengers;
	    
	    private String razorpayPaymentId;
}

//quota //dept time 