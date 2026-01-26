package com.mrc.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mrc.dtos.TrainSummaryDto;
import com.mrc.entities.train.Tier;
import com.mrc.entities.train.TrainEntity;
import com.mrc.entities.train.TrainQuota;

public interface TrainRepository extends JpaRepository<TrainEntity, Long>{
	 @Query("""
		        SELECT t
		        FROM TrainEntity t
		        WHERE t.source = :source
		          AND t.destination = :destination
		    """)
		    List<TrainEntity> searchTrains(String source,String destination);
}
