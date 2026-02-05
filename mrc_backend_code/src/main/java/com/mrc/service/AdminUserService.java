package com.mrc.service;

import java.util.List;

import com.mrc.dtos.AdminUserResponseDto;

public interface AdminUserService {

    List<AdminUserResponseDto> getAllUsers();

    AdminUserResponseDto blockUser(Long userId);

    AdminUserResponseDto unblockUser(Long userId);
}
