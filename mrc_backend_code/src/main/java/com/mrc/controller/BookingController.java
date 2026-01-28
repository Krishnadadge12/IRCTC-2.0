package com.mrc.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.mrc.dtos.BookingRequestDto;
import com.mrc.dtos.BookingResponseDto;

import com.mrc.entities.users.UserEntity;

import com.mrc.service.BookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // ================== BOOK TICKET ==================
    @PostMapping
    public ResponseEntity<BookingResponseDto> bookTicket(
            @AuthenticationPrincipal UserEntity user,
            @RequestBody BookingRequestDto dto
    ) {
    	System.out.println(new BCryptPasswordEncoder().encode("Admin@123"));
        return ResponseEntity.ok(
                bookingService.createBooking(user, dto)
                

        );
    }

    // ================== CANCEL BOOKING ==================
    @DeleteMapping("/{bookingId}/cancel")
    public ResponseEntity<BookingResponseDto> cancelBooking(
            @PathVariable Long bookingId,
            @AuthenticationPrincipal UserEntity user
    ) {
        return ResponseEntity.ok(
                bookingService.cancelBooking(bookingId, user)
        );
    }
}