package com.mrc.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mrc.dtos.BookingRequestDto;
import com.mrc.entities.users.UserEntity;
import com.mrc.service.BookingServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/Booking")
@RequiredArgsConstructor
public class BookingController {	
 
private final BookingServiceImpl bookingService;

@PostMapping("/booking")	
public ResponseEntity<?> createBooking(@RequestBody BookingRequestDto request, Authentication auth){
	return ResponseEntity.status(HttpStatus.CREATED)
			.body(bookingService.bookTicket(request,auth));
}
}
