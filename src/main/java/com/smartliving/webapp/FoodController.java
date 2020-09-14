package com.smartliving.webapp;

import java.security.Principal;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class FoodController {

    private final FoodRepository foodRepository;
    private final MealRepository mealRepository;
    private final DietRepository dietRepository;
    private final ClientRepository clientRepository;
    private final UserRepository userRepository;

    FoodController(FoodRepository foodRepository, MealRepository mealRepository, DietRepository dietRepository, ClientRepository clientRepository, UserRepository userRepository) {
        this.foodRepository = foodRepository;
        this.mealRepository = mealRepository;
        this.dietRepository = dietRepository;
        this.clientRepository = clientRepository;
        this.userRepository = userRepository;
    }

    // DIETPLANS
    @GetMapping("/dietplan")
    List<DietPlan> allDietPlans(){
        return dietRepository.findAll();
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

    // MEALS
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

    //Client
    @PostMapping(path = "/client", consumes = MediaType.ALL_VALUE)
    Client newClient(@RequestBody Client newClient){
        return clientRepository.save(newClient);
    }

    //User
    @PostMapping(path = "/user", consumes = MediaType.ALL_VALUE)
    User newUser(@RequestBody User newUser, Principal principal){
        String username = principal.getName();
        return userRepository.save(newUser);
    }
}
