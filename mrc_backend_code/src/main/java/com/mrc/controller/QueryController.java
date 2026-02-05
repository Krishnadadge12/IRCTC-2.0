package com.mrc.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mrc.dtos.QueryRequestDto;
import com.mrc.dtos.QueryResponseDto;
import com.mrc.service.QueryService;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/queries")
@RequiredArgsConstructor
public class QueryController {

    private final QueryService service;

    //  PUBLIC API – no authentication
    @PostMapping
    public QueryResponseDto createQuery(@Valid @RequestBody QueryRequestDto dto) {
        return service.createQuery(dto);
    }
}
