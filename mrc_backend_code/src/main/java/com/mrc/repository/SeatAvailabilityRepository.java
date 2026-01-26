package com.mrc.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import com.mrc.entities.train.SeatType;
import com.mrc.dtos.SeatAvailabilityDto;
import com.mrc.entities.train.SeatAvailability;
import com.mrc.entities.train.Tier;
import com.mrc.entities.train.TrainQuota;

import jakarta.persistence.LockModeType;

public interface SeatAvailabilityRepository  extends JpaRepository<SeatAvailability, Long>{
	@Query("""
			SELECT new com.mrc.dtos.SeatAvailabilityDto(
			        s.coach.coachType,
			        s.type,
			        s.quota,
			        COUNT(s)
			)
			FROM SeatAvailability s
			WHERE s.coach.train.id = :trainId
			AND s.booked = com.mrc.entities.train.SeatStatus.VACANT
			GROUP BY s.coach.coachType, s.type, s.quota
			""")
			List<SeatAvailabilityDto> findAvailability(
			        Long trainId,
			        LocalDate date
			);
	
	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("""
	    SELECT s
	    FROM SeatAvailability s
	    WHERE s.coach.train.id = :trainId
	      AND s.coach.coachType = :coachType
	      AND s.quota = :quota
	      AND s.booked = com.mrc.entities.train.SeatStatus.AVAILABLE
	""")
	List<SeatAvailability> findSeatForBooking(
	        Long trainId,
	        Tier tier,
	        TrainQuota quota
	);
}
