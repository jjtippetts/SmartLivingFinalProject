package com.smartliving.webapp.meal;

import com.smartliving.webapp.food.Food;
import com.smartliving.webapp.food.FoodRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The controller responsible for handling all HTTP requests related specifically to meals.
 */
@RestController
@RequestMapping("/meal")
public class MealController {

    private final MealRepository mealRepository;
    private final FoodRepository foodRepository;

    MealController(MealRepository mealRepository, FoodRepository foodRepository){
        this.mealRepository = mealRepository;
        this.foodRepository = foodRepository;
    }

    // Returns a list of all the meals
    @GetMapping()
    List<Meal> allMeals(){
        return mealRepository.findAll();
    }

    // Saves a meal
    @PostMapping(consumes = MediaType.ALL_VALUE)
    Meal newMeal(@RequestBody Meal newMeal){
        mealRepository.save(newMeal);
        return newMeal;
    }

    // Saves a food to a meal by id
    @PutMapping(value = "/{id}", consumes = MediaType.ALL_VALUE)
    Food addFoodToMeal(@RequestBody Food newFood, @PathVariable Long id){
        Food food = foodRepository.save(newFood);
        Meal meal = mealRepository.findById(id).orElse(null);
        meal.addFood(newFood);
        mealRepository.save(meal);
        return food;
    }
}
