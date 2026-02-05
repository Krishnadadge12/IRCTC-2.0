package com.mrc.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mrc.dtos.QueryResponseDto;
import com.mrc.entities.Query;
import com.mrc.service.QueryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/queries")
@RequiredArgsConstructor
public class AdminQueryController {

    private final QueryService service;

    //  ADMIN: Get all queries
    @GetMapping
    public List<QueryResponseDto> getAllQueries() {
        return service.getAllQueries();
    }

    //  ADMIN: Resolve query
    @PatchMapping("/{id}/resolve")
    public QueryResponseDto resolveQuery(@PathVariable Long id) {
        return service.resolveQuery(id);
    }
}
