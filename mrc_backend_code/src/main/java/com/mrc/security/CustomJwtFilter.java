package com.mrc.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.mrc.dtos.JWTDTO;
import com.mrc.entities.users.UserEntity;
import com.mrc.repository.UserRepository;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class CustomJwtFilter extends OncePerRequestFilter {

    private final JWTUtils jwtUtils;
    private final UserRepository userRepository;


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String path = request.getRequestURI();

        //  BYPASS JWT FOR PUBLIC ENDPOINTS
        if (
            path.startsWith("/users/login") ||
            path.startsWith("/users/register") ||
            path.startsWith("/swagger-ui") ||
            path.startsWith("/v3/api-docs") ||
            path.startsWith("/actuator")
        ) {
            filterChain.doFilter(request, response);
            return;
        }

        //  JWT VALIDATION FOR PROTECTED ENDPOINTS
        String headerValue = request.getHeader("Authorization");

        if (headerValue != null && headerValue.startsWith("Bearer ")) {
            String jwt = headerValue.substring(7);
            log.info("JWT found");

            Claims claims = jwtUtils.validateJWT(jwt);

            String role = claims.get("role", String.class);
            Long userId = claims.get("user_id", Long.class);

         // Load full user from DB
            UserEntity user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found from JWT"));

            // principal = UserEntity
            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(
                            user,
                            null,
                            List.of(new SimpleGrantedAuthority(role))
                    );


            SecurityContextHolder.getContext().setAuthentication(auth);
            log.info("Security context populated");
        }

        filterChain.doFilter(request, response);
    }
    
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();

        return path.startsWith("/users/login")
            || path.startsWith("/users/register")
            || path.startsWith("/swagger-ui")
            || path.startsWith("/v3/api-docs")
            || path.startsWith("/actuator");
    }

}
