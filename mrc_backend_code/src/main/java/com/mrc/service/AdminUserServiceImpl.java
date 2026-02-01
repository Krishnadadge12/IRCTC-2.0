package com.mrc.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mrc.custom_exceptions.ApiException;
import com.mrc.custom_exceptions.ResourceNotFoundException;
import com.mrc.dtos.AdminUserResponseDto;
import com.mrc.entities.users.UserEntity;
import com.mrc.entities.users.UserRole;
import com.mrc.entities.users.UserStatus;
import com.mrc.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminUserServiceImpl implements AdminUserService {

    private final UserRepository userRepository;

    @Override
    public List<AdminUserResponseDto> getAllUsers() {


        return userRepository.findByUserRole(UserRole.ROLE_PASSENGERS)
                .stream()
                .map(u -> new AdminUserResponseDto(
                        u.getId(),
                        u.getFirstName(),
                        u.getLastName(),
                        u.getDob(),
                        u.getPhone(),
                        u.getUserStatus()
                ))
                .toList();
    }

    @Override
    public AdminUserResponseDto blockUser(Long userId) {

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: " + userId
                        ));

        if (user.getUserStatus() == UserStatus.BLOCKED) {
            throw new ApiException("User is already blocked");
        }

        user.setUserStatus(UserStatus.BLOCKED);

        return  new AdminUserResponseDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getDob(),
                user.getPhone(),
                user.getUserStatus()
        );
    }

    @Override
    public AdminUserResponseDto unblockUser(Long userId) {

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id: " + userId
                        ));

        if (user.getUserStatus() == UserStatus.ACTIVE) {
            throw new ApiException("User is already active");
        }

        user.setUserStatus(UserStatus.ACTIVE);

        return new AdminUserResponseDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getDob(),
                user.getPhone(),
                user.getUserStatus()
        );
    }
}

