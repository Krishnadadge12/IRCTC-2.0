package com.mrc.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mrc.entities.train.SeatPrice;
import com.mrc.entities.train.SeatType;
import com.mrc.entities.train.Tier;
import com.mrc.entities.train.TrainQuota;

public interface SeatPriceRepository extends JpaRepository<SeatPrice, Long>{
	@Query("""
			SELECT sp FROM SeatPrice sp
			WHERE sp.train.id = :trainId
			  AND sp.coachType = :coachType
			  AND sp.seatType = :seatType
			""")
			Optional<SeatPrice> findSeatPrice(
			        Long trainId,
			        Tier coachType,
			        SeatType seatType
			);
}
