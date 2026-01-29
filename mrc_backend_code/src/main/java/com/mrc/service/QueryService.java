package com.mrc.service;

import java.util.List;

import com.mrc.dtos.QueryRequestDto;
import com.mrc.dtos.QueryResponseDto;
import com.mrc.entities.Query;

public interface QueryService {

    QueryResponseDto createQuery(QueryRequestDto dto);

    List<QueryResponseDto> getAllQueries();

    QueryResponseDto resolveQuery(Long queryId);
}
