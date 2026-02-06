package com.mrc.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.mrc.entities.users.UserEntity;
import com.mrc.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor

public class CustomUserDetailsServiceImpl implements UserDetailsService {
	// depcy
	private final UserRepository userRepository;
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		//invoke dao's method	
		
		UserEntity userEntity=userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Email doesn't exist"));
		//=> user by email exists 
		return userEntity;
	}

}
