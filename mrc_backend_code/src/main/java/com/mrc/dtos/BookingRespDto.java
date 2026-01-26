package com.mrc.dtos;

import java.time.LocalDateTime;
import java.util.List;

import com.mrc.entities.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingRespDto {
	private Long bookingId;
    private String pnr;
    private BookingStatus status;

    private String trainName;
    private String source;
    private String destination;

    private LocalDateTime departure;
    private LocalDateTime arrival;

    private List<PassengerRespDto> passengers;
}
