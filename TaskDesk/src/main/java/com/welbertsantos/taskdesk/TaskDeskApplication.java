package com.welbertsantos.taskdesk;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.welbertsantos.taskdesk.api.Enum.ProfileEnum;
import com.welbertsantos.taskdesk.api.entity.User;
import com.welbertsantos.taskdesk.api.repository.UserRepository;

@SpringBootApplication
public class TaskDeskApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskDeskApplication.class, args);
	}
	
	@Bean
    CommandLineRunner init(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            initUsers(userRepository, passwordEncoder);
        };

    }
    
	private void initUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        User admin = new User();
        admin.setEmail("taskdesk@taskdesk.com");
        admin.setPassword(passwordEncoder.encode("123456"));
        admin.setProfile(ProfileEnum.Administrador);
		
        User find = userRepository.findByEmail("taskdesk@taskdesk.com");
        if (find == null) {
            userRepository.save(admin);
        }
	}

}
