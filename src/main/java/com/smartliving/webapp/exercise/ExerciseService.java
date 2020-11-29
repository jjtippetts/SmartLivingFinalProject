package com.smartliving.webapp.exercise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseService {
  private ExerciseRepository exerciseRepository;

  @Autowired
  public ExerciseService(ExerciseRepository exerciseRepository) {
    this.exerciseRepository = exerciseRepository;
  }

  public List<Exercise> getExercises(String exerciseName) {
    return exerciseRepository.findAllByNameIgnoreCase(exerciseName);
  }

  public Exercise getExerciseById(long id) {
    return exerciseRepository.findById(id).orElse(null);
  }

  public Exercise saveExercise(Exercise exercise) {
    exerciseRepository.save(exercise);
    return exercise;
  }

  public List<Exercise> getDefaultExerciseSet() {
    return exerciseRepository.findAll();
  }
}
