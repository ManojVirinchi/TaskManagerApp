package com.taskmanager.backend.repository;

import com.taskmanager.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // We don't need to write any methods here for basic CRUD (Create, Read, Update, Delete)
    // JpaRepository already provides them!
    List<Task> findByUserId(Long userId);
}
