package com.mrc.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mrc.custom_exceptions.ResourceNotFoundException;
import com.mrc.dtos.QueryRequestDto;
import com.mrc.dtos.QueryResponseDto;
import com.mrc.entities.Query;
import com.mrc.entities.QueryStatus;
import com.mrc.repository.QueryRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class QueryServiceImpl implements QueryService {

    private final QueryRepository queryRepository;

    //  PUBLIC – anyone can raise a query
    @Override
    public QueryResponseDto createQuery(QueryRequestDto dto) {

        Query query = new Query();
        query.setEmail(dto.getEmail());
        query.setMessage(dto.getMessage());
        query.setStatus(QueryStatus.PENDING);

        Query saved = queryRepository.save(query);

        return new QueryResponseDto(
                saved.getId(),
                saved.getEmail(),
                saved.getMessage(),
                saved.getStatus()
        );
    }

    //  ADMIN
    @Override
    public List<QueryResponseDto> getAllQueries() {
        return queryRepository.findAll()
                .stream()
                .map(q -> new QueryResponseDto(
                        q.getId(),
                        q.getEmail(),
                        q.getMessage(),
                        q.getStatus()
                ))
                .toList();
    }

    //  ADMIN
    @Override
    public QueryResponseDto resolveQuery(Long queryId) {

        Query query = queryRepository.findById(queryId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Query not found with id " + queryId));

        query.setStatus(QueryStatus.RESOLVED);

        return new QueryResponseDto(
                query.getId(),
                query.getEmail(),
                query.getMessage(),
                query.getStatus()
        );
    }
}

