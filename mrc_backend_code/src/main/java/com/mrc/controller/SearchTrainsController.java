package com.mrc.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mrc.dtos.SearchTrainDTO;
import com.mrc.dtos.TrainSummaryDto;
import com.mrc.service.TrainService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:5173")  //so that browser allows request, * only for development purpose
@RestController   			// to declare a spring bean - containing REST API end point provider
@RequestMapping("/trains")
@RequiredArgsConstructor	//
public class SearchTrainsController {
	
	//dependency on SearchTrainService
	private final TrainService trainService;
	
	/*
	 * 1.API Desc - Search trains (using DTO), returns List of Trains 
	 * by URI- /trains/search?source=PUNE&destination=MUMBAI&date=2026-02-10&travelClass=SL&quota=GN
	 * Method- GET (with query parameters) 
	 * ResponseEntity<?> error resp - SC 200(incase train not found, empty list will be returned)
	 * 
	 * */
	
	 @GetMapping("/search")
	    public ResponseEntity<List<TrainSummaryDto>> searchTrains(@ModelAttribute SearchTrainDTO searchDto) {
		 
		 System.out.println("SEARCH DTO => " + searchDto);
		 	List<TrainSummaryDto> trains =trainService.searchTrains(searchDto);
	        return ResponseEntity.ok(trains);
	    }
	 
	/*
	 * 2.API Desc - Train Details, returns one particular Train
	 * URI- /trains/{trainId}
	 * Method-GET
	 * Path var - train id
	 * Response - TrainDetailDTO
	 * Eg. {
	 * trainNumber,trainName,source,destination,
	 * departureTime,arrivalTime,duration(dept-arrival),Date,
	 * }
	 * 
	 * */
	 
	 @GetMapping("/{trainId}")
	    public ResponseEntity<TrainSummaryDto> getTrainDetails(@PathVariable Long trainId) {
	        TrainSummaryDto trainDetail = trainService.getTrainDetails(trainId);
	        return ResponseEntity.ok(trainDetail);
	    }
}
