package com.mrc.dtos;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AuthRequest {
	@NotBlank(message = "Email is required!")
	@Email(message = "Invalid Email format !")
	private String email;
	@NotBlank(message = "Password is required !")
	private String password;
}
