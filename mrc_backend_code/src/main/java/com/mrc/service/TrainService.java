package com.mrc.service;

import java.util.List;

import com.mrc.dtos.SearchTrainDTO;
import com.mrc.dtos.TrainSummaryDto;

public interface TrainService {

    // Search trains based on user criteria
    List<TrainSummaryDto> searchTrains(SearchTrainDTO searchDto);

    // Get details of a single train (with optional quota)
    TrainSummaryDto getTrainDetails(Long trainId, String quota, String tier);
}
