package com.mrc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mrc.entities.train.SeatPrice;

public interface SeatPriceRepository extends JpaRepository<SeatPrice, Long> {

}
