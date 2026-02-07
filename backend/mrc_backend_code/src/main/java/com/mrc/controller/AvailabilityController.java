package com.mrc.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mrc.custom_exceptions.ResourceNotFoundException;
import com.mrc.dtos.SeatAvailabilityDto;
import com.mrc.entities.train.SeatPrice;
import com.mrc.repository.SeatPriceRepository;
import com.mrc.service.AvailabilityService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/trains")
@RequiredArgsConstructor
public class AvailabilityController {
	 private final AvailabilityService availabilityService;
	 private final SeatPriceRepository seatPriceRepository;

	    @GetMapping("/{trainId}/availability")
	    public ResponseEntity<List<SeatAvailabilityDto>> getAvailability(
	            @PathVariable Long trainId,
	            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	            LocalDate date) {

	        return ResponseEntity.ok(
	                availabilityService.getAvailability(trainId, date)
	        );
	    }
	    @GetMapping("/seat-fare/{priceId}")
	    public ResponseEntity<Map<String, Object>> getSeatFare(
	            @PathVariable Long priceId) {

	        SeatPrice price = seatPriceRepository.findById(priceId)
	                .orElseThrow(() ->
	                    new ResourceNotFoundException("Seat price not found: " + priceId));

	        return ResponseEntity.ok(Map.of(
	                "priceId", priceId,
	                "price", price.getPrice()
	        ));
	    }

}
