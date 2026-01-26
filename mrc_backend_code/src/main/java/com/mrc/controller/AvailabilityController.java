package com.mrc.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mrc.dtos.SeatAvailabilityDto;
import com.mrc.service.AvailabilityService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/trains")
@RequiredArgsConstructor
public class AvailabilityController {
	 private final AvailabilityService availabilityService;

	    @GetMapping("/{trainId}/availability")
	    public ResponseEntity<List<SeatAvailabilityDto>> getAvailability(
	            @PathVariable Long trainId,
	            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	            LocalDate date) {

	        return ResponseEntity.ok(
	                availabilityService.getAvailability(trainId, date)
	        );
	    }
}
