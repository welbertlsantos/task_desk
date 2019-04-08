package com.welbertsantos.taskdesk.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.welbertsantos.taskdesk.api.entity.User;

public interface UserRepository extends MongoRepository<User, String> {
	
	User findByEmail(String email);

}
