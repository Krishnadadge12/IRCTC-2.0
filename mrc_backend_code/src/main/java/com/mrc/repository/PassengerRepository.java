package com.mrc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mrc.entities.Booking;
import com.mrc.entities.users.PassengerEntity;

public interface PassengerRepository extends JpaRepository<PassengerEntity,Long>{

}
