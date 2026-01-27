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

	    // 1️⃣ Validate password match (IMPORTANT)
	    if (!dto.getPassword().equals(dto.getConfirmPassword())) {
	        throw new IllegalArgumentException("Password and Confirm Password do not match");
	    }

	    // 2️⃣ Check if email exists
	    if (userRepository.existsByEmail(dto.getEmail())) {
	        throw new IllegalArgumentException("Email already registered");
	    }

	    // 3️⃣ Check if phone exists
	    if (userRepository.existsByPhone(dto.getPhone())) {
	        throw new IllegalArgumentException("Phone already registered");
	    }

	    // 4️⃣ Create entity
	    UserEntity user = new UserEntity();
	    user.setFirstName(dto.getFirstName());
	    user.setLastName(dto.getLastName());
	    user.setDob(dto.getDob());                 // nullable ✔
	    user.setEmail(dto.getEmail());
	    user.setPhone(dto.getPhone());

	    // Optional enums – set only if present
	    user.setGender(dto.getGender());            // nullable ✔
	    user.setIdProof(dto.getIdProof());          // nullable ✔

	    // 5️⃣ Encrypt password
	    user.setPassword(passwordEncoder.encode(dto.getPassword()));

	    // 6️⃣ REQUIRED DEFAULTS (CRITICAL)
	    user.setUserRole(UserRole.ROLE_PASSENGERS);
	    user.setUserStatus(UserStatus.ACTIVE);

	    // 7️⃣ Save user
	    return userRepository.save(user);
	}


}
