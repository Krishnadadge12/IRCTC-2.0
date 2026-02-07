package com.mrc.security;


import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.mrc.entities.users.*;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Component

public class JWTUtils {
	//To inject a value in Spring bean (value based D.I) 
	@Value("${jwt.secret.key}")//in application.properties
	private String secretKey;
	//To inject exp time
	@Value("${jwt.expiration.time}")//in application.properties
	private long expTime;
	//symmetric secret key - HMAC-SHA256
	private SecretKey key;
	
	@PostConstruct
	public void myInit() {
		key=Keys.hmacShaKeyFor(secretKey.getBytes());//Creates a new SecretKey instance for use with HMAC-SHA algorithms based on the specified key byte array
		
		
	}
	
//generate token
	public String generateToken(UserEntity user) {
		Date createdOn=new Date();
		Date expDate=new Date(createdOn.getTime()+expTime);
		return Jwts.builder() //create JWT builder
				.subject(user.getEmail()) //set subject (issuer)
				.issuedAt(createdOn) //set issued at
				.expiration(expDate) //set exp date
				//payload - custom claims 
				.claims(Map.of("user_id", user.getId(),
						"role", user.getUserRole().name()))
				.signWith(key)
				.compact(); //generate token string				
	}
	//payload: sent to frontend after login in the response entity of UserController
//	{
//		  "sub": "user@example.com",
//		  "iat": 1675340000000,
//		  "exp": 1675343600000,
//		  "user_id": 5,
//		  "role": "ROLE_PASSENGERS"
//		}

	// validate token
	public Claims validateJWT(String jwt) //checks sign and expiry, if invalid throws exception
	{
		 return Jwts.parser() //parse JWT token
				.verifyWith(key) //same secret key for verification which was prev used for signing
				.build()
				.parseSignedClaims(jwt) //userId and role
				.getPayload();
		 
				
				
	}
}
