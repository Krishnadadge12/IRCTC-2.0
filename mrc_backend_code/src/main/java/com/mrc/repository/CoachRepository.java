package com.mrc.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mrc.entities.train.Coach;
import com.mrc.entities.train.Tier;
import com.mrc.entities.train.TrainEntity;

public interface CoachRepository extends JpaRepository<Coach, Long> {

	Optional<Coach> findFirstByTrainAndCoachType(TrainEntity train, Tier coachType);

}
