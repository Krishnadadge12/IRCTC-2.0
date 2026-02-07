package com.mrc.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Lock;
import jakarta.persistence.LockModeType;
import jakarta.persistence.QueryHint;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
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

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@QueryHints(@QueryHint(name = "jakarta.persistence.lock.timeout", value = "5000"))

	@Query("""
	SELECT s FROM SeatAvailability s 
	WHERE s.coach = :coach 
	AND s.booked = :status 
	AND s.quota = :quota
	AND s.journeyDate = :journeyDate
	ORDER BY s.id
	""")
	List<SeatAvailability> findAvailableSeatsForUpdate(
	        @Param("coach") Coach coach,
	        @Param("status") SeatStatus status,
	        @Param("quota") TrainQuota quota,
	        @Param("journeyDate") LocalDate journeyDate,
	        Pageable pageable
	);



	
}
