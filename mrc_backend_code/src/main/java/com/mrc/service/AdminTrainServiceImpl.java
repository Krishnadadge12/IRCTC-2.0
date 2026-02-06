package com.mrc.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mrc.custom_exceptions.ApiException;
import com.mrc.custom_exceptions.ResourceNotFoundException;
import com.mrc.dtos.AdminTrainResponseDto;
import com.mrc.dtos.TrainRequestDto;
import com.mrc.dtos.TrainResponseDto;
import com.mrc.entities.train.TrainEntity;
import com.mrc.entities.train.TrainStatus;
import com.mrc.mapper.AdminTrainMapper;
import com.mrc.repository.TrainRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminTrainServiceImpl implements AdminTrainService {

    private final TrainRepository repo;
    private final AdminTrainMapper mapper;
    
    @Override
    public TrainResponseDto addTrain(TrainRequestDto dto) {

        TrainEntity train = new TrainEntity();
        train.setTrainNumber(dto.getTrainNumber());
        train.setTrainName(dto.getTrainName());
        train.setSource(dto.getSource());
        train.setDestination(dto.getDestination());
        train.setDepartureTime(dto.getDepartureTime());
        train.setArrivalTime(dto.getArrivalTime());
        train.setScheduleDate(dto.getScheduleDate());
        train.setTrainStatus(dto.getTrainStatus() != null ? dto.getTrainStatus() : TrainStatus.SCHEDULED);

        // If coaches are provided
        if (dto.getCoaches() != null) {
            dto.getCoaches().forEach(c -> {
                c.setTrain(train); // set train reference
            });
            train.setCoaches(dto.getCoaches());
        }

        TrainEntity saved = repo.save(train);

        return new TrainResponseDto(
                saved.getId(),
                saved.getTrainNumber(),
                saved.getTrainName(),
                saved.getSource(),
                saved.getDestination(),
                saved.getDepartureTime(),
                saved.getArrivalTime(),
                saved.getScheduleDate(),
                saved.getTrainStatus()
        );
    }

    @Override
    public List<AdminTrainResponseDto> getAll() {
        return repo.findAll()
                .stream()
                .map(mapper::toDto)
                .toList();
    }
    public AdminTrainResponseDto updateStatus(Long id, TrainStatus status) {
        TrainEntity t = repo.findById(id).orElseThrow(() ->
        new ResourceNotFoundException(
                "Train not found with id: " + id
        ));
        if (t.getTrainStatus() == status) {
            throw new ApiException(
                    "Train is already in status: " + status
            );
        }

        t.setTrainStatus(status);
        return mapper.toDto(t);
    }
}