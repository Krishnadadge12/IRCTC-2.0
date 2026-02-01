package com.mrc.service;

import java.time.LocalDate;
import java.util.List;

import com.mrc.dtos.SeatAvailabilityDto;

public interface AvailabilityService {
	 List<SeatAvailabilityDto> getAvailability(Long trainId,LocalDate date);
}
