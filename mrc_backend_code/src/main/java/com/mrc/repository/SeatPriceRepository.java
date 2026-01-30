package com.mrc.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mrc.entities.train.SeatPrice;
import com.mrc.entities.train.Tier;
import com.mrc.entities.train.TrainEntity;
import com.mrc.entities.train.TrainQuota;

public interface SeatPriceRepository extends JpaRepository<SeatPrice, Long> {
	 Optional<SeatPrice> findByTrainAndCoachTypeAndQuota(
	            TrainEntity train,
	            Tier coachType,
	            TrainQuota quota
	    );

	

}
