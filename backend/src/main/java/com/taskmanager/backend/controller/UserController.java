package com.taskmanager.backend.controller;

import com.taskmanager.backend.model.User;
import com.taskmanager.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Create a new user
    @PostMapping("/create")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Get all users (optional for testing)
    @GetMapping
    public java.util.List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
