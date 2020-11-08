package com.smartliving.webapp.exercise;

import com.smartliving.webapp.user.User;
import com.smartliving.webapp.user.UserNotFoundException;
import com.smartliving.webapp.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExercisePlanService {
  private ExercisePlanRepository exercisePlanRepository;
  private UserService userService;

  @Autowired
  public ExercisePlanService(ExercisePlanRepository exerciseRepository, UserService userService) {
    this.exercisePlanRepository = exerciseRepository;
    this.userService = userService;
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

  public ExercisePlan savePlan(ExercisePlan toSave) {
    return this.exercisePlanRepository.save(toSave);
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
