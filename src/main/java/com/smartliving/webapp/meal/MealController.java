package com.smartliving.webapp.meal;

import com.smartliving.webapp.food.Food;
import com.smartliving.webapp.food.FoodRepository;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MealController {

    private final MealRepository mealRepository;
    private final FoodRepository foodRepository;

    MealController(MealRepository mealRepository, FoodRepository foodRepository){
        this.mealRepository = mealRepository;
        this.foodRepository = foodRepository;
    }

    @GetMapping("/meal")
    List<Meal> allMeals(){
        return mealRepository.findAll();
    }

    @PostMapping(path = "/meal", consumes = MediaType.ALL_VALUE)
    Meal newMeal(@RequestBody Meal newMeal){
        mealRepository.save(newMeal);
        return newMeal;
    }

    @PutMapping(value = "/meal/{id}", consumes = MediaType.ALL_VALUE)
    Food addFoodToMeal(@RequestBody Food newFood, @PathVariable Long id){
        Food food = foodRepository.save(newFood);
        Meal meal = mealRepository.findById(id).orElse(null);
        meal.addFood(newFood);
        mealRepository.save(meal);
        return food;
    }
}
