package com.mrc.service;

import java.time.Duration;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mrc.custom_exceptions.ApiException;
import com.mrc.custom_exceptions.ResourceNotFoundException;
import com.mrc.dtos.SearchTrainDTO;
import com.mrc.dtos.TrainSummaryDto;
import com.mrc.entities.train.TrainEntity;
import com.mrc.repository.TrainRepository;

import lombok.RequiredArgsConstructor;



@Service
@Transactional
@RequiredArgsConstructor
public class TrainServiceImpl implements TrainService {

    private final TrainRepository trainRepository;
    private final ModelMapper modelMapper;

    // ================== SEARCH TRAINS ==================

    @Override
    public List<TrainSummaryDto> searchTrains(SearchTrainDTO searchDto) {

        List<TrainEntity> trains =
                trainRepository.searchTrains(
                        searchDto.getSource(),
                        searchDto.getDestination()
                );

        if (trains.isEmpty()) {
            throw new ApiException(
                    "No trains found from " +
                    searchDto.getSource() +
                    " to " +
                    searchDto.getDestination()
            );
        }

        return trains.stream()
                .map(t -> {
                    TrainSummaryDto summary = new TrainSummaryDto();

                    summary.setTrainId(t.getId());
                    summary.setTrainName(t.getTrainName());
                    summary.setSource(t.getSource());
                    summary.setDestination(t.getDestination());
                    summary.setDepartureTime(t.getDepartureTime());
                    summary.setArrivalTime(t.getArrivalTime());

                    long minutes = Duration.between(
                            t.getDepartureTime(),
                            t.getArrivalTime()
                    ).toMinutes();

                    summary.setDuration(
                            (minutes / 60) + "h " + (minutes % 60) + "m"
                    );

                    return summary;
                })
                .toList();
    }

    // ================== TRAIN DETAILS ==================

    @Override
    public SearchTrainDTO getTrainDetails(Long trainId) {

        TrainEntity train = trainRepository.findById(trainId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Train not found with id: " + trainId
                        )
                );

        return modelMapper.map(train, SearchTrainDTO.class);
    }
}
