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
    if (!areValidExercises(toSave.getExercises())) {
      throw new ExercisePlanException("Unable to save plan; invalid exercises");
    }
    toSave.setExercises(mapExercises(toSave.getExercises()));
    return this.exercisePlanRepository.save(toSave);
  }

  private List<ExercisePlanExercise> mapExercises(List<ExercisePlanExercise> exercisesSetsReps) {
    ArrayList<ExercisePlanExercise> mappedExercisePlanExercises = new ArrayList<>() ;
    for (int i = 0; i < exercisesSetsReps.size(); i++) {
      ExercisePlanExercise exercisePlanExercise = exercisesSetsReps.get(i);
      Exercise mappedExercise = exerciseService.getExerciseById(exercisePlanExercise.getExercise().getId());
      mappedExercisePlanExercises.add(new ExercisePlanExercise(exercisePlanExercise.getSets(), exercisePlanExercise.getReps(), exercisePlanExercise.getWeight(), exercisePlanExercise.isMetric(), mappedExercise));
    }
    return mappedExercisePlanExercises;
  }

  private boolean areValidExercises(List<ExercisePlanExercise> exercisesSetsReps) {
    for (ExercisePlanExercise exercisePlanExercise : exercisesSetsReps) {
      Exercise exercise = exercisePlanExercise.getExercise();
      if (!exerciseService.getExerciseById(exercise.getId()).getName().equals(exercise.getName())) {
        return false;
      }
    }
    return true;
  }

  public long deletePlan(long planId, String userName) throws ExercisePlanException, UserNotFoundException {
    ExercisePlan toDelete = getPlan(planId);
    if (toDelete == null) {
      throw new ExercisePlanException("Unable to delete this plan, exercise plan not found.");
    }

    User user = userService.getUser(userName);
    if (toDelete.getUser() != user) {
      throw new ExercisePlanException("Unable to delete this plan, the user does not own this exercise plan.");
    }

    this.exercisePlanRepository.deleteById(planId);
    return planId;
  }
}
