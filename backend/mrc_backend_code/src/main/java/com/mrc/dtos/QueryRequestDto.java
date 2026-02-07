package com.mrc.dtos;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QueryRequestDto {

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String message;
}
