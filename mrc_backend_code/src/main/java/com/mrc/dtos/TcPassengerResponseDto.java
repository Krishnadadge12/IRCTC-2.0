package com.mrc.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TcPassengerResponseDto {

    private Long passengerId;
    private String name;
    private Integer age;
    private String gender;

    private String coachNo;
    private String seatNo;
    private String seatLabel;

    private String pnr;
}
