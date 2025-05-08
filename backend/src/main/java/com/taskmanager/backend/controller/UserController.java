package com.taskmanager.backend.controller;

import com.taskmanager.backend.model.User;
import com.taskmanager.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Create a new user (Signup)
    @PostMapping("/create")
    public User createUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword())); // hash password before saving
        return userRepository.save(user);
    }

    // Get all users (for testing purposes)
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User loginUser) {
        User user = userRepository.findByUsername(loginUser.getUsername());

        if (user == null || !passwordEncoder.matches(loginUser.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("id", user.getId());
        response.put("username", user.getUsername());
        System.out.println("Raw password: " + loginUser.getPassword());
        System.out.println("Hashed password in DB: " + user.getPassword());


        return ResponseEntity.ok(response);
    }
}
