package com.smartliving.webapp.dietplan;

import com.smartliving.webapp.meal.Meal;
import com.smartliving.webapp.meal.MealRepository;
import com.smartliving.webapp.user.User;
import com.smartliving.webapp.user.UserRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
public class DietPlanController {
    private final DietRepository dietRepository;
    private final UserRepository userRepository;
    private final MealRepository mealRepository;

    DietPlanController(DietRepository dietRepository, UserRepository userRepository, MealRepository mealRepository){
        this.dietRepository = dietRepository;
        this.userRepository = userRepository;
        this.mealRepository = mealRepository;
    }

    @GetMapping("/dietplan")
    List<DietPlan> allDietPlans(Principal principal){
        String username = principal.getName();
        User user = userRepository.getUserByUsername(username);
        return dietRepository.findByUser_Id(user.getId());
    }

    @GetMapping("/dietplan/{id}")
    DietPlan getDietPlanById(@PathVariable Long id){
        return dietRepository.findById(id).get();
    }

    /**
     * Creates a new diet plan for a user
     * @param principal user credentials
     * @return
     */
    @PostMapping(path = "/dietplan", consumes = MediaType.ALL_VALUE)
    DietPlan newDietPlan(@RequestBody DietPlan newDietPlan, Principal principal){
        String username = principal.getName();
        User user = userRepository.getUserByUsername(username);
        user.addDietPlan(newDietPlan);
        user = userRepository.save(user);
        List<DietPlan> dietPlans = user.getDietPlans();
        int numberOfDietPlans = dietPlans.size();
        return dietPlans.get(numberOfDietPlans - 1);
    }

    @PutMapping(value = "/dietplan/{id}", consumes = MediaType.ALL_VALUE)
    Meal newMeal(@RequestBody Meal newMeal, @PathVariable Long id){
        DietPlan dietPlan = dietRepository.findById(id).orElse(null);
        dietPlan.addMeal(newMeal);
        dietPlan = dietRepository.save(dietPlan);
        List<Meal> mealList = dietPlan.getMeals();
        Meal savedMeal = mealRepository.findByNameAndAndDietPlan_Id(newMeal.getName(),dietPlan.getId());
        return savedMeal;
    }
}
