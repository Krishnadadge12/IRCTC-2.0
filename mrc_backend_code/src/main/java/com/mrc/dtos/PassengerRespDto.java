package com.mrc.dtos;

import com.mrc.entities.train.SeatType;
import com.mrc.entities.users.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PassengerRespDto {
	 private String name;
	    private Integer age;
	    private Gender gender;
	    private SeatType berthPreference;
	    private String phone;
	    private String email;
}
