package com.mrc.dtos;

import java.time.LocalDate;

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
public class SearchTrainDTO {
	 private String source;
	 private String destination;
	 private LocalDate date;
	 private Tier travelClass;		//SLEEPER, AC1, AC2
	 private TrainQuota quota;		//GENERAL, TATKAL
}
