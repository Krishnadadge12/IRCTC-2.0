package com.mrc.dtos;


import com.mrc.entities.QueryStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class QueryResponseDto {

    private Long queryId;
    private String email;
    private String message;
    private QueryStatus status;
}
