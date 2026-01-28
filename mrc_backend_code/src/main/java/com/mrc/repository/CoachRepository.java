package com.mrc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mrc.entities.train.Coach;

public interface CoachRepository extends JpaRepository<Coach, Long> {

}
