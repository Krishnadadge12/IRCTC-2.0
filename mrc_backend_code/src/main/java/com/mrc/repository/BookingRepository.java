package com.mrc.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mrc.entities.Booking;
import com.mrc.entities.BookingStatus;
import com.mrc.entities.train.TrainEntity;
import com.mrc.entities.train.TrainQuota;
import com.mrc.entities.users.UserEntity;

public interface BookingRepository extends JpaRepository<Booking, Long> {
	 Optional<Booking> findByIdAndUser_Id(Long bookingId, Long userId);
	 
	 Optional<Booking> findById(Long bookingId);
	 
	int countByTrainAndJourneyDateAndBookingStatus(TrainEntity train, LocalDate journeyDate, BookingStatus waitlist);
	
	Optional<Booking> findFirstByTrainAndJourneyDateAndBookingStatusOrderByBookedOnAsc(
	        TrainEntity train,
	        LocalDate journeyDate,
	        BookingStatus bookingStatus
	);
	Optional<Booking> findFirstByTrainAndJourneyDateAndBookingStatusAndTotalFare_QuotaOrderByBookedOnAsc(
			TrainEntity train, LocalDate journeyDate, BookingStatus waitlist, TrainQuota quota);

	List<Booking> findByTrain_Id(Long trainId);

	List<Booking> findByUserOrderByBookedOnDesc(UserEntity user);
	Optional<Booking> findByPnr(String pnr);

}
