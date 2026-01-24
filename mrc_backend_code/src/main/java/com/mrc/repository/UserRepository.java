package com.mrc.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mrc.entities.users.UserEntity;



public interface UserRepository extends JpaRepository<UserEntity,Long> {
//check if user exists by email
	boolean existsByEmail(String em);
	//finder for authentication
	Optional<UserEntity>  findByEmailAndPassword(String email, String password);
	//finder by email
	Optional<UserEntity>  findByEmail(String email);
}
