package com.mrc.service;

import org.springframework.security.core.Authentication;

import com.mrc.dtos.BookingRequestDto;
import com.mrc.entities.Booking;

public interface BookingService {
	Booking bookTicket(BookingRequestDto request, Authentication auth);
}
