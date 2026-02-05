package com.mrc.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mrc.dtos.SeatAvailabilityDto;
import com.mrc.entities.train.Coach;
import com.mrc.entities.train.SeatAvailability;
import com.mrc.entities.train.SeatStatus;
import com.mrc.entities.train.TrainEntity;
import com.mrc.entities.train.TrainQuota;

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
		      AND s.booked = :status
		    GROUP BY s.coach.coachType, s.type, s.quota
		""")
		List<SeatAvailabilityDto> findAvailability(
		        @Param("trainId") Long trainId,
		        @Param("status") SeatStatus status
		);


	Optional<SeatAvailability> findFirstByCoachAndBookedAndQuota(Coach coach, SeatStatus available, TrainQuota quota);
}
