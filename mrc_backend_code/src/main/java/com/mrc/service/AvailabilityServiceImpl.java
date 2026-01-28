package com.mrc.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mrc.dtos.SeatAvailabilityDto;
import com.mrc.entities.train.SeatStatus;
import com.mrc.repository.SeatAvailabilityRepository;


import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AvailabilityServiceImpl implements AvailabilityService {

	private final SeatAvailabilityRepository seatAvailabilityRepository;
	@Override
	public List<SeatAvailabilityDto> getAvailability(Long trainId, LocalDate date) {
	    return seatAvailabilityRepository.findAvailability(
	            trainId,
	            SeatStatus.AVAILABLE   // or VACANT (see note below)
	    );
	}

}
