package com.mrc.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.mrc.entities.users.UserEntity;
import com.mrc.entities.users.UserRole;
import com.mrc.entities.users.UserStatus;
import com.mrc.repository.UserRepository;
import com.mrc.dtos.ApiResponse;
import com.mrc.dtos.UserDto;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService
{
	private final UserRepository userRepository;	
	private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder;

	@Override
	public ApiResponse encryptPassword() {
		//get all users
				List<UserEntity> users = userRepository.findAll();	
				//user - persistent
				users.forEach(user ->
				 user.setPassword(passwordEncoder.encode(user.getPassword())));
				return new ApiResponse("Password encrypted", "Success");
	}
	public UserEntity registerUser(UserDto dto) {

        //  Check if email exists
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        //  Check if phone exists
        if (userRepository.existsByPhone(dto.getPhone())) {
            throw new RuntimeException("Phone already registered");
        }

        //  Create entity
        UserEntity user = new UserEntity();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setDob(dto.getDob());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setGender(dto.getGender());
        user.setIdProof(dto.getIdProof());

        // Encrypt password
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        //  Set defaults
        user.setUserRole(UserRole.ROLE_PASSENGERS);
        user.setUserStatus(UserStatus.ACTIVE);

        //  Save
        return userRepository.save(user);
    }

}
