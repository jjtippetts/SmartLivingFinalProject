package com.smartliving.webapp.exercise;

import com.smartliving.webapp.user.User;
import com.smartliving.webapp.user.UserNotFoundException;
import com.smartliving.webapp.userdetails.MyUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ExerciseController {
  @Autowired
  private ExerciseService exerciseService;

  @Autowired
  private ExercisePlanService exercisePlanService;

  @GetMapping("/api/exercise")
  @ResponseBody
  public List<Exercise> GetExercise(@RequestParam String exerciseName) {
    return exerciseService.getExercises(exerciseName);
  }

  @GetMapping("/api/exercises/default")
  @ResponseBody
  public List<Exercise> GetExercise() {
    return exerciseService.getDefaultExerciseSet();
  }

  @PostMapping(path="/api/exercise")
  public Exercise CreateExercise(Exercise exercise) {
    return exerciseService.saveExercise(exercise);
  }

  @PostMapping(path="/api/exercisePlans/save")
  @ResponseBody
  public ExercisePlan SaveExercisePlan(@RequestBody ExercisePlan exercisePlan, @AuthenticationPrincipal MyUserDetails userDetails) throws UserNotFoundException, ExercisePlanException {
    return exercisePlanService.savePlan(exercisePlan, userDetails);
  }

  @GetMapping(path="/api/exercisePlans/{userId}")
  @ResponseBody
  public List<ExercisePlan> GetUserExercisePlans(@PathVariable long userId) throws UserNotFoundException {
    return exercisePlanService.getUserPlans(userId);
  }

  @GetMapping(path="/api/exercisePlans/")
  @ResponseBody
  public List<ExercisePlan> GetUserExercisePlans(@AuthenticationPrincipal MyUserDetails userDetails) throws UserNotFoundException {
    return exercisePlanService.getUserPlans(userDetails.getUsername());
  }

  @DeleteMapping(path="/api/exercisePlans/delete/{exercisePlanId}")
  @ResponseBody
  public long DeleteExercisePlan(@PathVariable long exercisePlanId, @AuthenticationPrincipal MyUserDetails userDetails) throws ExercisePlanException, UserNotFoundException {
    return exercisePlanService.deletePlan(exercisePlanId, userDetails.getUsername());
  }

  @ExceptionHandler({UserNotFoundException.class, ExercisePlanException.class})
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Map<String, List<String>> handleDuplicateUserException(Exception ex) {
    HashMap<String, List<String>> errorResult = new HashMap<>() {};
    ArrayList<String> errorList = new ArrayList<>();
    errorList.add(ex.getMessage());
    errorResult.put("errors", errorList);
    return errorResult;
  }
}
