package com.mrc.dtos;

import com.mrc.entities.train.SeatType;
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
public class SeatAvailabilityDto {
	 private Tier travelClass;      // SLEEPER, AC1, AC2, AC3
	 private SeatType type;			//LB,UB...
	 private TrainQuota quota;      // GENERAL, TATKAL
	 private Long seatsAvailable;
	 private double price;
	 
	 public SeatAvailabilityDto(Tier travelClass,SeatType type,TrainQuota quota,Long seatsAvailable) {
		    this.travelClass = travelClass;
		    this.type = type;
		    this.quota = quota;
		    this.seatsAvailable = seatsAvailable;
		}

}
