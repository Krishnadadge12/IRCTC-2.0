package com.mrc.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration //to declare java configuration class (equivalent to bean config xml )
@EnableWebSecurity //to enable spring web security
@EnableMethodSecurity //to enable method level annotation for spring security
@RequiredArgsConstructor //non null & final
public class SecurityConfiguration {
	private final PasswordEncoder passwordEncoder;
	private final CustomJwtFilter customJwtFilter;
	/*
	 * Configure SecurityFilterChain as a spring bean @Bean method
	 * Provider | Builder for - HttpSecurity
	 * Add this as the method arg .
	 * 
	 */
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		//configure filter chain here......
		//1. Disable CSRF protection
		http.csrf(csrf-> csrf.disable());
		//2. Disable HttpSession - so that spring sec DOES NOT create any HttpSession object to store sec info (context)
		http.sessionManagement(
				sessionConfig -> 
				sessionConfig.sessionCreationPolicy
				(SessionCreationPolicy.STATELESS));
		//public endpoints - w/o authentication & authorization
		http.authorizeHttpRequests(request ->		
		request.requestMatchers(
                "/swagger-ui/**",
                "/v3/api-docs/**",
                "/users/login",
                "/users/register",
                "/users/pwd-encryption"
        ).permitAll()
		//ONLY for browser app - React app - permit all in flight requests
		.requestMatchers(HttpMethod.OPTIONS).permitAll()
		// 🧍 PASSENGER only APIs
        .requestMatchers(
                HttpMethod.POST,
                "/bookings/**",
                "/tickets/**"
        ).hasRole("PASSENGERS")
        // TC + ADMIN APIs
        .requestMatchers(
                "/tc/**",
                "/tickets/verify/**"
        ).hasAnyRole("TC", "ADMIN")

        //  ADMIN only APIs
        .requestMatchers(
                "/admin/**",
                "/users",
                "/users/**"
        ).hasRole("ADMIN")

        //  Everything else must be authenticated
        .anyRequest().authenticated());
		//simply add custom jwt filter before any of the auth filters
        
		http.addFilterBefore(customJwtFilter, UsernamePasswordAuthenticationFilter.class);
		
		//4. enable form login
	//	http.formLogin(Customizer.withDefaults());
		//5. enable Basic Auth scheme
	//	http.httpBasic(Customizer.withDefaults());
		return http.build();//Build sec filter chain using HttpSecurity builder
	}
	//configure AuthenticationManager as spring bean
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception
	{
		return config.getAuthenticationManager();
	}
	
	
}
