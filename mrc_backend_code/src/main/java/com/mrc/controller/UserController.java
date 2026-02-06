package com.mrc.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mrc.dtos.AuthRequest;

import com.mrc.dtos.AuthResponse;
import com.mrc.dtos.UserDto;
import com.mrc.entities.users.UserEntity;
import com.mrc.security.JWTUtils;
import com.mrc.service.UserService;


import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController // to declare a spring bean - containing REST API end point provider
@RequestMapping("/users")
//@CrossOrigin(origins = "http://localhost:3000") // to set CORS policy on specific origins
@Validated
@Slf4j
@RequiredArgsConstructor
public class UserController {

  
	// depcy	
	private final UserService userService;
	private final AuthenticationManager authenticationManager;
	private final JWTUtils jwtUtils;

   
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody @Valid AuthRequest dto) {
		//System.out.println("in log in " + dto);

		/*
		 * 1. Invoke AuthenticationManager's authenticate method
		 * public Authentication authenticate(Authentication auth)
		 * i/p - not yet verified credentials (email , password)
		 * o/p 
		 * success - Authentication : Fully authenticated object (email, pwd-null , collection of GrantedAuthority) 
		 * Failure - throws AuthenticationException	
		 * Authentication - i/f
		 * Implemented by a class 
		 * UserNamePasswordAuthenticationToken(Object email,Object password)
		 */
		Authentication fullyAuthenticated = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));
		//calls DAOAuthenticationProvider->CustomUserDetailsServiceImpl.loadUserByUsername(email)->returns user->spring checks password using PasswordEncoder->return Authentication object
		//fullyAuthenticated has-> principal:userEntity, cred:null, isAuthenticated=true,authorities=[ROLE_PASSENGERS];
//		System.out.println("is user authenticated "+fullyAuthenticated.isAuthenticated());//true
//		System.out.println(fullyAuthenticated.getPrincipal().getClass());//user details object - UserEntity
		//downcast Principal (Object -> UserEntity)
		UserEntity userEntity=(UserEntity)fullyAuthenticated.getPrincipal();
		
		return ResponseEntity.ok(new AuthResponse("Login Successful",jwtUtils.generateToken(userEntity)));

	}
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody @Valid UserDto dto) {

	    // 1️ Validate password match
	    if (!dto.getPassword().equals(dto.getConfirmPassword())) {
	        return ResponseEntity.badRequest()
	                .body("Password and Confirm Password do not match");
	    }

	    // 2️ Delegate to service layer
	    UserEntity savedUser = userService.registerUser(dto);

	    // 3 Return response (NO password)
	    return ResponseEntity.ok("User registered successfully with email: " + savedUser.getEmail());
	}
	

}
