package com.mrc.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mrc.dtos.AdminTrainResponseDto;
import com.mrc.entities.train.TrainEntity;
import com.mrc.entities.train.TrainStatus;
import com.mrc.service.AdminTrainService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/trains")
@RequiredArgsConstructor
public class AdminTrainController {

    private final AdminTrainService service;

    @GetMapping
    public List<AdminTrainResponseDto> getAllTrains() {
        return service.getAll();
    }

    @PatchMapping("/{id}/status")
    public AdminTrainResponseDto updateStatus(@PathVariable Long id,
                             @RequestParam TrainStatus status) {
    	return  service.updateStatus(id, status);
    }
}
