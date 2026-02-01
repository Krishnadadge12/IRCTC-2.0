package com.mrc.service;

import java.util.List;

import com.mrc.dtos.AdminBookingResponseDto;


public interface AdminBookingService {

	
	 List<AdminBookingResponseDto> getBookingsByTrain(Long trainId);

	 AdminBookingResponseDto cancelBooking(Long id);

}
