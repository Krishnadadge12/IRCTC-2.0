package com.mrc.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PassengerResponseDto {
    private String fullName;
    private Integer age;
    private String gender;
    private String seatNo;
    private String coachNo;
    private String seatLabel;
    private String berthPreference;   
    private String phone;             
    private String email;   
}
