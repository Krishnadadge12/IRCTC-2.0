package com.mrc.dtos;

import com.mrc.entities.BaseEntity;
import com.mrc.entities.train.SeatType;
import com.mrc.entities.users.Gender;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PassengerDto extends BaseEntity{
 @NotBlank(message = "Passenger name is required")
 private String name;
 @Min(value = 1, message = "Age must be at least 1")
 @Max(value = 120, message = "Age must be realistic")
 private Integer age;
 @NotNull(message = "Gender is required")
 private Gender gender;
 @Email(message = "Invalid email format")
 private String email;
 @Pattern(
	        regexp = "^[0-9]{10}$",
	        message = "Phone number must be 10 digits"
	    )
 private String Phone;
 @NotNull(message = "Berth preference is required")
 private SeatType berthPreference;
}

