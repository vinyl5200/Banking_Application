package com.cams.bankapplication.controller;

import com.cams.bankapplication.model.User;
import com.cams.bankapplication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')") // This secures the endpoint
    public ResponseEntity<List<User>> getAllUsers() {
        // For simplicity, we return the User entity directly.
        // In a real app, you would use a DTO to avoid exposing the password.
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
}
