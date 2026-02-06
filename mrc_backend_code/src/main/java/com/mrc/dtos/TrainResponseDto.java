package com.mrc.dtos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import com.mrc.entities.train.Coach;
import com.mrc.entities.train.TrainStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class TrainResponseDto {
    private Long trainId;
    private Long trainNumber;
    private String trainName;
    private String source;
    private String destination;
    private LocalTime departureTime;
    private LocalTime arrivalTime;
    private LocalDate scheduleDate;
    private TrainStatus trainStatus;
}