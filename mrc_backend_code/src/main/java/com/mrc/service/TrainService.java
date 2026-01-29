package com.mrc.service;

import java.util.List;

import com.mrc.dtos.SearchTrainDTO;
import com.mrc.dtos.TrainSummaryDto;

public interface TrainService {
	//methods to search for trains
	/*
	 * 1.List of Trains, TrainDTO
	 * 2.Train details
	 * 3.Seat Availability 
	 * */
	public List<TrainSummaryDto> searchTrains(SearchTrainDTO searchDto);

	public TrainSummaryDto getTrainDetails(Long trainId);
}
