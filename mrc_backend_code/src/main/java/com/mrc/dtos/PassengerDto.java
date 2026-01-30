package com.mrc.dtos;



import com.mrc.entities.users.Gender;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PassengerDto {
    private String name;
    private Integer age;
    private Gender gender;
    
    private String seatNo;
    private String seatLabel;
}
