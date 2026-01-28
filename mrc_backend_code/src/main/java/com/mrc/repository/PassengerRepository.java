package com.mrc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mrc.entities.Booking;
import com.mrc.entities.passenger.Passenger;

public interface PassengerRepository extends JpaRepository<Passenger, Long> {

	Passenger findByBookingTrainId(Long trainId);
	List<Passenger> findByBooking(Booking booking);

}
