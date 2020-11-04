package com.smartliving.webapp.exercise;

import com.smartliving.webapp.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExerciseService {
  private ExerciseRepository exerciseRepository;

  @Autowired
  public ExerciseService(ExerciseRepository exerciseRepository) {}

  public List<Exercise> getExercises(String exerciseName) {
    return exerciseRepository.findAllByName(exerciseName);
  }

  public Exercise saveExercise(Exercise exercise) {
    exerciseRepository.save(exercise);
    return exercise;
  }
}
