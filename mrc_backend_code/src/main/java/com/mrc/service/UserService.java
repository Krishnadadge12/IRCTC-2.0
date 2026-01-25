package com.mrc.service;

import com.mrc.dtos.ApiResponse;
import com.mrc.dtos.UserDto;
import com.mrc.entities.users.UserEntity;

import jakarta.validation.Valid;

public interface UserService {


	ApiResponse encryptPassword();

	UserEntity registerUser(@Valid UserDto dto);
}
