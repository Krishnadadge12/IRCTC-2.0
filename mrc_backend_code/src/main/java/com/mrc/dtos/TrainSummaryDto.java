package com.mrc.dtos;

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
    private String source;
    private String destination;

    private LocalTime departureTime;
    private LocalTime arrivalTime;
    private String duration;       // "6h 15m"

   // private List<Tier> availableClasses;   // SLEEPER, AC1, AC2
   //private TrainQuota quota;               // GENERAL

    

}
