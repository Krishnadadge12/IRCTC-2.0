package com.mrc.service;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
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
    private final ModelMapper modelMapper;

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

            //  COACH + SEAT PRICE (MANDATORY FOR BOOKING)
            if (t.getCoaches() != null && !t.getCoaches().isEmpty()) {

                Coach coach = t.getCoaches().get(0);
                summary.setCoachId(coach.getId());

                seatPriceRepository
                    .findByTrainAndCoachTypeAndQuota(
                        t,
                        coach.getCoachType(),
                        TrainQuota.GENERAL
                    )
                    .ifPresent(seatPrice ->
                        summary.setSeatPriceId(seatPrice.getId())
                    );
            }


            // Duration
            long minutes = Duration.between(
                    t.getDepartureTime(),
                    t.getArrivalTime()
            ).toMinutes();
            summary.setDuration((minutes / 60) + "h " + (minutes % 60) + "m");

            // Classes
            if (t.getCoaches() != null && !t.getCoaches().isEmpty()) {
                List<String> classes = t.getCoaches().stream()
                        .map(c -> c.getCoachType().toString())
                        .distinct()
                        .collect(Collectors.toList());
                summary.setClasses(classes);
            }

            summary.setQuota("GENERAL");
            return summary;
        }).toList();
    }

    // ================= TRAIN DETAILS =================
    @Override
    public TrainSummaryDto getTrainDetails(Long trainId) {

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

            Coach coach = train.getCoaches().get(0);
            summary.setCoachId(coach.getId());

            seatPriceRepository
                .findByTrainAndCoachTypeAndQuota(
                    train,
                    coach.getCoachType(),
                    TrainQuota.GENERAL
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

        summary.setQuota("GENERAL");
        return summary;
    }
}
