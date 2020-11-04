package com.smartliving.webapp.exercise;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
  List<Exercise> findAllByName(String name);
}
