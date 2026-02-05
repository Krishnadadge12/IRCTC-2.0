package com.mrc.service;

import java.util.List;

import com.mrc.dtos.TcPassengerResponseDto;

public interface TcService {
	List<TcPassengerResponseDto> getPassengersByTrain(Long trainId);

}
