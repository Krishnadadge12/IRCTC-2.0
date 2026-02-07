package com.mrc.dtos;

import java.time.LocalDate;

import com.mrc.entities.users.Gender;
import com.mrc.entities.users.IdProof;
import com.mrc.entities.users.UserRole;
import com.mrc.entities.users.UserStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserResponseDto {

	private Long userId;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String email;
    private String phone;
    private Gender gender;
    private IdProof idProof;
    private UserStatus status;
}