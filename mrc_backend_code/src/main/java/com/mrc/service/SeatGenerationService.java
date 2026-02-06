package com.mrc.service;

import org.springframework.stereotype.Service;

import com.mrc.entities.train.Coach;
import com.mrc.entities.train.SeatAvailability;
import com.mrc.entities.train.SeatStatus;
import com.mrc.entities.train.SeatType;
import com.mrc.entities.train.TrainQuota;
import com.mrc.repository.SeatAvailabilityRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class SeatGenerationService {

    private final SeatAvailabilityRepository seatRepo;

    public void generateSeats(Coach coach) {

        int totalSeats = switch (coach.getCoachType()) {
            case SLEEPER -> 72;
            case AC3 -> 64;
            case AC2 -> 48;
            case AC1 -> 24;
        };

        SeatType[] seatPattern = {
            SeatType.LB, SeatType.MB, SeatType.UB,
            SeatType.LB, SeatType.MB, SeatType.UB,
            SeatType.SL, SeatType.SU
        };

        for (int i = 1; i <= totalSeats; i++) {
            SeatType type = seatPattern[(i - 1) % seatPattern.length];

            for (TrainQuota quota : TrainQuota.values()) {
                SeatAvailability seat = new SeatAvailability();
                seat.setCoach(coach);
                seat.setType(type);
                seat.setBooked(SeatStatus.AVAILABLE);
                seat.setQuota(quota);
                seat.setJourneyDate(coach.getTrain().getScheduleDate());

                seatRepo.save(seat);
            }
        }
    }
}

