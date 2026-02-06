

package com.mrc.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mrc.dtos.AdminUserResponseDto;

import com.mrc.service.AdminUserService;

import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping("/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserService service;

    //  Get all users
    @GetMapping
    public List<AdminUserResponseDto> getAllUsers() {
        return service.getAllUsers();
    }

    //  Block user
    @PatchMapping("/{id}/block")
    public AdminUserResponseDto blockUser(@PathVariable Long id) {
        return service.blockUser(id);
    }

    //  Unblock user
    @PatchMapping("/{id}/unblock")
    public AdminUserResponseDto unblockUser(@PathVariable Long id) {
        return service.unblockUser(id);
    }
}