package com.mrc.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mrc.custom_exceptions.InvalidInputException;
import com.mrc.custom_exceptions.ResourceNotFoundException;
import com.mrc.dtos.SeatAvailabilityDto;
import com.mrc.entities.train.SeatStatus;
import com.mrc.repository.SeatAvailabilityRepository;


import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AvailabilityServiceImpl implements AvailabilityService {

    private final SeatAvailabilityRepository seatAvailabilityRepository;

    @Override
    public List<SeatAvailabilityDto> getAvailability(Long trainId, LocalDate date) {

        if (trainId == null) {
            throw new InvalidInputException("Train ID must not be null");
        }

        if (date == null) {
            throw new InvalidInputException("Journey date must not be null");
        }

        if (date.isBefore(LocalDate.now())) {
            throw new InvalidInputException("Cannot check availability for past dates");
        }

        List<SeatAvailabilityDto> availability =
                seatAvailabilityRepository.findAvailability(
                        trainId,
                        SeatStatus.AVAILABLE
                );

        if (availability.isEmpty()) {
            throw new ResourceNotFoundException(
                    "No available seats found for trainId=" + trainId +
                    " on date=" + date
            );
        }

        return availability;
    }
}

