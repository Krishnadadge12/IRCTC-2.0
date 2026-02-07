package com.mrc.service;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mrc.dtos.SearchTrainDTO;
import com.mrc.dtos.TrainSummaryDto;
import com.mrc.entities.train.TrainEntity;
import com.mrc.entities.train.TrainQuota;
import com.mrc.entities.train.Coach;

import com.mrc.repository.SeatPriceRepository;
import com.mrc.repository.TrainRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TrainServiceImpl implements TrainService {

    private final TrainRepository trainRepository;
    private final SeatPriceRepository seatPriceRepository;

    // ================= SEARCH TRAINS =================
    @Override
    public List<TrainSummaryDto> searchTrains(SearchTrainDTO searchDto) {

        List<TrainEntity> trains = trainRepository.searchTrains(
                searchDto.getSource(),
                searchDto.getDestination(),
                searchDto.getScheduleDate()
        );

        return trains.stream().map(t -> {

            TrainSummaryDto summary = new TrainSummaryDto();

            summary.setTrainId(t.getId());
            summary.setTrainNumber(t.getTrainNumber());
            summary.setTrainName(t.getTrainName());
            summary.setSource(t.getSource());
            summary.setDestination(t.getDestination());
            summary.setDepartureTime(t.getDepartureTime());
            summary.setArrivalTime(t.getArrivalTime());
            summary.setScheduleDate(t.getScheduleDate());

            // --------- PICK CORRECT COACH (BASED ON USER SELECTION) ---------
            Coach selectedCoach = null;

            if (t.getCoaches() != null && !t.getCoaches().isEmpty()) {

                // Try to match user-selected class first
                if (searchDto.getTravelClass() != null) {
                    selectedCoach = t.getCoaches().stream()
                            .filter(c -> c.getCoachType().toString()
                                    .equalsIgnoreCase(searchDto.getTravelClass()))
                            .findFirst()
                            .orElse(null);
                }

                // Fallback to first coach if no match
                if (selectedCoach == null) {
                    selectedCoach = t.getCoaches().get(0);
                }

                summary.setCoachId(selectedCoach.getId());

                // --------- CORRECT SEAT PRICE BASED ON QUOTA + CLASS ---------
                TrainQuota quota = TrainQuota.valueOf(
                        searchDto.getQuota() != null
                                ? searchDto.getQuota().toUpperCase()
                                : "GENERAL"
                );

                seatPriceRepository
                        .findByTrainAndCoachTypeAndQuota(
                                t,
                                selectedCoach.getCoachType(),
                                quota
                        )
                        .ifPresent(seatPrice ->
                                summary.setSeatPriceId(seatPrice.getId())
                        );
            }

            // --------- DURATION ---------
            long minutes = Duration.between(
                    t.getDepartureTime(),
                    t.getArrivalTime()
            ).toMinutes();

            summary.setDuration((minutes / 60) + "h " + (minutes % 60) + "m");

            // --------- CLASSES (AC1, AC2, SLEEPER, etc.) ---------
            if (t.getCoaches() != null && !t.getCoaches().isEmpty()) {
                List<String> classes = t.getCoaches().stream()
                        .map(c -> c.getCoachType().toString())
                        .distinct()
                        .collect(Collectors.toList());

                summary.setClasses(classes);
            }

            // --------- PASS USER-SELECTED QUOTA FORWARD ---------
            summary.setQuota(
                    searchDto.getQuota() != null
                            ? searchDto.getQuota().toUpperCase()
                            : "GENERAL"
            );

            return summary;

        }).toList();
    }

    // ================= TRAIN DETAILS =================
    @Override
    public TrainSummaryDto getTrainDetails(Long trainId, String quota, String tier) {


        TrainEntity train = trainRepository.findById(trainId)
                .orElseThrow(() ->
                        new RuntimeException("Train not found with id: " + trainId));

        TrainSummaryDto summary = new TrainSummaryDto();

        summary.setTrainId(train.getId());
        summary.setTrainNumber(train.getTrainNumber());
        summary.setTrainName(train.getTrainName());
        summary.setSource(train.getSource());
        summary.setDestination(train.getDestination());
        summary.setDepartureTime(train.getDepartureTime());
        summary.setArrivalTime(train.getArrivalTime());
        summary.setScheduleDate(train.getScheduleDate());

        if (train.getCoaches() != null && !train.getCoaches().isEmpty()) {

        	Coach coach = train.getCoaches().stream()
        	        .filter(c -> tier != null &&
        	                c.getCoachType().toString().equalsIgnoreCase(tier))
        	        .findFirst()
        	        .orElse(train.getCoaches().get(0)); // fallback


            TrainQuota q = TrainQuota.valueOf(
                    quota != null ? quota.toUpperCase() : "GENERAL"
            );

            seatPriceRepository
                    .findByTrainAndCoachTypeAndQuota(
                            train,
                            coach.getCoachType(),
                            q
                    )
                    .ifPresent(seatPrice ->
                            summary.setSeatPriceId(seatPrice.getId())
                    );
        }

        long minutes = Duration.between(
                train.getDepartureTime(),
                train.getArrivalTime()
        ).toMinutes();

        summary.setDuration((minutes / 60) + "h " + (minutes % 60) + "m");

        if (train.getCoaches() != null && !train.getCoaches().isEmpty()) {
            List<String> classes = train.getCoaches().stream()
                    .map(c -> c.getCoachType().toString())
                    .distinct()
                    .collect(Collectors.toList());

            summary.setClasses(classes);
        }

        summary.setQuota(quota != null ? quota.toUpperCase() : "GENERAL");

        return summary;
    }
}
