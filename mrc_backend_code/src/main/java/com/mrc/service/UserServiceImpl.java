package com.mrc.service;




import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.mrc.entities.users.UserEntity;
import com.mrc.entities.users.UserRole;
import com.mrc.entities.users.UserStatus;
import com.mrc.repository.UserRepository;

import com.mrc.dtos.UserDto;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService
{
	private final UserRepository userRepository;	
	//private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder;

	
	public UserEntity registerUser(UserDto dto) {

	    // 1️ Validate password match (IMPORTANT)
	    if (!dto.getPassword().equals(dto.getConfirmPassword())) {
	        throw new IllegalArgumentException("Password and Confirm Password do not match");
	    }

	    // 2️ Check if email exists
	    if (userRepository.existsByEmail(dto.getEmail())) {
	        throw new IllegalArgumentException("Email already registered");
	    }

	    // 3️ Check if phone exists
	    if (userRepository.existsByPhone(dto.getPhone())) {
	        throw new IllegalArgumentException("Phone already registered");
	    }

	    // 4️ Create entity
	    UserEntity user = new UserEntity();
	    user.setFirstName(dto.getFirstName());
	    user.setLastName(dto.getLastName());
	    user.setDob(dto.getDob());                 // nullable ✔
	    user.setEmail(dto.getEmail());
	    user.setPhone(dto.getPhone());

	    // Optional enums – set only if present
	    user.setGender(dto.getGender());            // nullable ✔
	    user.setIdProof(dto.getIdProof());          // nullable ✔

	    // 5️ Encrypt password
	    user.setPassword(passwordEncoder.encode(dto.getPassword()));

	    // 6️ REQUIRED DEFAULTS (CRITICAL)
	    user.setUserRole(UserRole.ROLE_PASSENGERS);
	    user.setUserStatus(UserStatus.ACTIVE);

	    // 7️ Save user
	    return userRepository.save(user);
	}


}
