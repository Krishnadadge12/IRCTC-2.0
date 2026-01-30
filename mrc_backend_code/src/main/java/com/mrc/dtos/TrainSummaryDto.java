package com.mrc.dtos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.mrc.entities.train.Tier;
import com.mrc.entities.train.TrainQuota;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TrainSummaryDto {

    private Long trainId;          // for View Details click
    private String trainName;
    private Long trainNumber;
    private String source;
    private String destination;

    private LocalTime departureTime;
    private LocalTime arrivalTime;
    private String duration;       // "6h 15m"
    private LocalDate scheduleDate;
    
    private List<String> classes;   // 
    private String quota;            //

    private Long coachId;
    private Long seatPriceId;
}
