package com.mrc.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mrc.entities.passenger.Passenger;
import com.mrc.repository.PassengerRepository;
import com.mrc.service.BookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/tc")
@RequiredArgsConstructor
public class TcController {

    private final PassengerRepository passengerRepository;

    private final BookingService bookingService;
    
    // 🔍 View passengers of a train
    @GetMapping("/train/{trainId}/passengers")
    public ResponseEntity<?> getPassengersByTrain(
            @PathVariable Long trainId
    ) {
        return ResponseEntity.ok(
                passengerRepository.findByBookingTrainId(trainId)
        );
    }
    
    @DeleteMapping("/bookings/{bookingId}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable Long bookingId) {
        return ResponseEntity.ok(
            bookingService.cancelByAdmin(bookingId)
        );
    }
}
