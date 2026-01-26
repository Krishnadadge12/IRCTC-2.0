package com.mrc.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.mrc.entities.train.Tier;
import com.mrc.entities.train.TrainQuota;

import jakarta.validation.Valid;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class BookingRequestDto {
 @NotNull(message = "Train ID is required")	
 private Long train;
 private String source;
 private String destination;
 private LocalDate bookedOn;
 @NotNull(message = "Quota is required")
 private TrainQuota quota;
 @NotNull(message = "Coach tier is required")
 private Tier coachType;
 @Size(min = 1, message = "At least one passenger is required")
 @Valid
 private List<PassengerDto> passengers;
	
}

