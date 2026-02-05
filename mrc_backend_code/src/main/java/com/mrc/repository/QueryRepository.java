package com.mrc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mrc.entities.Query;

public interface QueryRepository extends JpaRepository<Query, Long> {

}
