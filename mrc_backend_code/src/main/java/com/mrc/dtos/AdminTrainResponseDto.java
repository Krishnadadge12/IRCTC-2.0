package com.mrc.dtos;

import com.mrc.entities.train.TrainStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminTrainResponseDto {

    private Long trainId;
    private Long trainNo;
    private String trainName;
    private String source;
    private String destination;
    private TrainStatus status;
}
