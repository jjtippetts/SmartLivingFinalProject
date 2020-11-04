package com.smartliving.webapp.exercise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ExerciseController {
  @Autowired
  private ExerciseService exerciseService;

  @GetMapping("/api/exercise/")
  public List<Exercise> GetExercise(@RequestParam String exerciseName) {
    return exerciseService.getExercises(exerciseName);
  }

  @PostMapping(path="/api/exercise")
  public Exercise CreateExercise(Exercise exercise) {
    return exerciseService.saveExercise(exercise);
  }
}
