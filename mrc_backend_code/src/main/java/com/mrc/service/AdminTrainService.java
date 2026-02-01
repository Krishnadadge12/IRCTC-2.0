package com.mrc.service;

import java.util.List;

import com.mrc.dtos.AdminTrainResponseDto;

import com.mrc.entities.train.TrainStatus;

public interface AdminTrainService {

	List<AdminTrainResponseDto> getAll();

	AdminTrainResponseDto updateStatus(Long id, TrainStatus status);

}
