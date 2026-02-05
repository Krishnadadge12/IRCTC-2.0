package com.mrc.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.mrc.entities.train.TrainEntity;


public interface TrainRepository extends JpaRepository<TrainEntity, Long>{
	@Query("""
		    SELECT t
		    FROM TrainEntity t
		    WHERE LOWER(t.source) = LOWER(:source)
		      AND LOWER(t.destination) = LOWER(:destination)
		      AND (CAST(t.scheduleDate AS DATE) = :scheduleDate OR :scheduleDate IS NULL)
		""")
		List<TrainEntity> searchTrains(
		    @Param("source") String source,
		    @Param("destination") String destination,
		    @Param("scheduleDate") LocalDate scheduleDate
		);

	 }
