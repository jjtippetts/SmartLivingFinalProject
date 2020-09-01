package com.smartliving.webapp;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
public class FoodController {

    private final FoodRepository foodRepository;
    private final MealRepository mealRepository;
    private final DietRepository dietRepository;

    FoodController(FoodRepository foodRepository, MealRepository mealRepository, DietRepository dietRepository) {
        this.foodRepository = foodRepository;
        this.mealRepository = mealRepository;
        this.dietRepository = dietRepository;
    }

    // DIETPLANS
    @GetMapping("/dietplans")
    List<DietPlan> allDietPlans(){
        return dietRepository.findAll();
    }

    // MEALS
    @GetMapping("/meals")
    List<Meal> allMeals(){
        return mealRepository.findAll();
    }

    //    FOODS
    @GetMapping("/food")
    List<Food> all() {
        return foodRepository.findAll();
    }

    @GetMapping("/food/{name}")
    List<Food> multiple(@PathVariable String name) {
        return foodRepository.findByNameContaining(name);
    }

    @PostMapping(path = "/food", consumes = MediaType.ALL_VALUE)
    Food newFood(@RequestBody Food newFood) {
        return foodRepository.save(newFood);
    }

    @DeleteMapping("/food/{id}")
    void deleteFood(@PathVariable Long id) {
        foodRepository.deleteById(id);
    }

}
