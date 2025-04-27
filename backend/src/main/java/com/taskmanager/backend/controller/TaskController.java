package com.taskmanager.backend.controller;

import com.taskmanager.backend.exception.ResourceNotFoundException;
import com.taskmanager.backend.model.Task;
import com.taskmanager.backend.repository.TaskRepository;
import com.taskmanager.backend.repository.UserRepository;
import com.taskmanager.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    // Create a new task
    @PostMapping("/create/{userId}")
    public Task createTask(@PathVariable Long userId, @RequestBody Task task) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            task.setUser(user.get());
            return taskRepository.save(task);
        } else {
            throw new ResourceNotFoundException("User not found with id: " + userId);

        }
    }

    // Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Get tasks by User ID
    @GetMapping("/user/{userId}")
    public List<Task> getTasksByUserId(@PathVariable Long userId) {
        return taskRepository.findByUserId(userId);
    }

    // Update a task
    @PutMapping("/{taskId}")
    public Task updateTask(@PathVariable Long taskId, @RequestBody Task updatedTask) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + taskId));


        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setDueDate(updatedTask.getDueDate());
        task.setStatus(updatedTask.getStatus());

        return taskRepository.save(task);
    }

    // Delete a task
    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId) {
        taskRepository.deleteById(taskId);
    }
}
