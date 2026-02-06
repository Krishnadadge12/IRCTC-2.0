package com.mrc.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mrc.dtos.AdminBookingResponseDto;
import com.mrc.service.AdminBookingService;

import lombok.RequiredArgsConstructor;

//@CrossOrigin(origins = "http://localhost:5173") //Temporary for testing 
@RestController
@RequestMapping("/admin/bookings")
@RequiredArgsConstructor
public class AdminBookingController {

    private final AdminBookingService service;

    //  ADMIN: Get all bookings for a train
    @GetMapping("/train/{trainId}")
    public ResponseEntity<List<AdminBookingResponseDto>> getBookingsByTrain(
            @PathVariable Long trainId
    ) {
        return ResponseEntity.ok(
                service.getBookingsByTrain(trainId)
        );
    }

    //  ADMIN: Cancel booking (status change only)
    @PatchMapping("/{bookingId}/status")
    public ResponseEntity<AdminBookingResponseDto> cancelBooking(
            @PathVariable Long bookingId
    ) {
        return ResponseEntity.ok(
                service.cancelBooking(bookingId)
        );
    }
}