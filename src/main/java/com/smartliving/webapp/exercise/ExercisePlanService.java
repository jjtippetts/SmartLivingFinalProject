package com.smartliving.webapp.exercise;

import com.smartliving.webapp.user.User;
import com.smartliving.webapp.user.UserNotFoundException;
import com.smartliving.webapp.user.UserService;
import com.smartliving.webapp.userdetails.MyUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExercisePlanService {
  private ExercisePlanRepository exercisePlanRepository;
  private UserService userService;
  private ExerciseService exerciseService;

  @Autowired
  public ExercisePlanService(ExercisePlanRepository exerciseRepository, UserService userService, ExerciseService exerciseService) {
    this.exercisePlanRepository = exerciseRepository;
    this.userService = userService;
    this.exerciseService = exerciseService;
  }

  public ExercisePlan getPlan(long planId) throws ExercisePlanException {
    ExercisePlan exercisePlan = this.exercisePlanRepository.findById(planId).orElse(null);
    if (exercisePlan == null) {
      throw new ExercisePlanException("Unable to get plan, exercise plan not found.");
    }
    return exercisePlan;
  }

  public List<ExercisePlan> getUserPlans(long userId) throws UserNotFoundException {
    User user = userService.getUser(userId);
    return this.exercisePlanRepository.findByUser(user);
  }

  public List<ExercisePlan> getUserPlans(String userName) throws UserNotFoundException {
    User user = userService.getUser(userName);
    return getUserPlans(user.getId());
  }

  public ExercisePlan savePlan(ExercisePlan toSave, MyUserDetails userDetails) throws UserNotFoundException, ExercisePlanException {
    toSave.setUser(userService.getUser(userDetails.getUsername()));
    if (!areValidExercises(toSave.getExercisesSetsReps())) {
      throw new ExercisePlanException("Unable to save plan; invalid exercises");
    }
    toSave.setExercisesSetsReps(mapExercises(toSave.getExercisesSetsReps()));
    return this.exercisePlanRepository.save(toSave);
  }

  private List<ExerciseSetsReps> mapExercises(List<ExerciseSetsReps> exercisesSetsReps) {
    ArrayList<ExerciseSetsReps> mappedExerciseSetsReps = new ArrayList<>() ;
    for (int i = 0; i < exercisesSetsReps.size(); i++) {
      ExerciseSetsReps exerciseSetsReps = exercisesSetsReps.get(i);
      Exercise mappedExercise = exerciseService.getExerciseById(exerciseSetsReps.getExercise().getId());
      mappedExerciseSetsReps.add(new ExerciseSetsReps(exerciseSetsReps.getSets(), exerciseSetsReps.getReps(), mappedExercise));
    }
    return mappedExerciseSetsReps;
  }

  private boolean areValidExercises(List<ExerciseSetsReps> exercisesSetsReps) {
    for (ExerciseSetsReps exerciseSetsReps: exercisesSetsReps) {
      Exercise exercise = exerciseSetsReps.getExercise();
      if (!exerciseService.getExerciseById(exercise.getId()).getName().equals(exercise.getName())) {
        return false;
      }
    }
    return true;
  }

  public void deletePlan(long userId, long planId) throws ExercisePlanException, UserNotFoundException {
    ExercisePlan toDelete = getPlan(planId);
    if (toDelete == null) {
      throw new ExercisePlanException("Unable to delete this plan, exercise plan not found.");
    }

    User user = userService.getUser(userId);
    if (toDelete.getUser() != user) {
      throw new ExercisePlanException("Unable to delete this plan, the user does not own this exercise plan.");
    }

    this.exercisePlanRepository.deleteById(planId);
  }
}
