package com.mrc.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mrc.dtos.TcPassengerResponseDto;
import com.mrc.entities.passenger.Passenger;
import com.mrc.repository.PassengerRepository;
import com.mrc.service.BookingService;
import com.mrc.service.TcService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/tc")
@RequiredArgsConstructor
public class TcController {

	  private final TcService tcService;
	    private final BookingService bookingService;

	    // TC: View passengers of a train
	    @GetMapping("/train/{trainId}/passengers")
	    public ResponseEntity<List<TcPassengerResponseDto>> getPassengersByTrain(
	            @PathVariable Long trainId
	    ) {
	        return ResponseEntity.ok(
	                tcService.getPassengersByTrain(trainId)
	        );
	    }

	    // TC/Admin: Cancel booking
	    @DeleteMapping("/bookings/{bookingId}/cancel")
	    public ResponseEntity<?> cancelBooking(@PathVariable Long bookingId) {
	        return ResponseEntity.ok(
	                bookingService.cancelByAdmin(bookingId)
	        );
	    }
}
