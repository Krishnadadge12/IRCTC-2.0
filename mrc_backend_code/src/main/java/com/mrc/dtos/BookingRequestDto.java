package com.mrc.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequestDto {

	 @NotNull
    private Long trainId;
	 @NotNull
    private Long coachId;
	 @NotNull
    private Long seatPriceId;
	 @NotNull
    private String source;
	 @NotNull
    private String destination;

    @NotNull
    private LocalDate journeyDate;
    @NotNull
    private LocalDateTime departure;
    @NotNull
    private LocalDateTime arrival;
    @NotNull
    private List<PassengerDto> passengers;
}
