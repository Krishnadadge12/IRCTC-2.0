package com.mrc.mapper;

import org.springframework.stereotype.Component;

import com.mrc.dtos.AdminTrainResponseDto;
import com.mrc.entities.train.TrainEntity;

@Component
public class AdminTrainMapper {

    public AdminTrainResponseDto toDto(TrainEntity train) {
        AdminTrainResponseDto dto = new AdminTrainResponseDto();
        dto.setTrainId(train.getId());
        dto.setTrainNo(train.getTrainNumber());
        dto.setTrainName(train.getTrainName());
        dto.setSource(train.getSource());
        dto.setDestination(train.getDestination());
        dto.setStatus(train.getTrainStatus());
        return dto;
    }
}
