package com.smartliving.webapp;


import com.smartliving.webapp.dietplan.DietPlan;
import com.smartliving.webapp.dietplan.DietRepository;
import com.smartliving.webapp.exercise.*;
import com.smartliving.webapp.food.Food;
import com.smartliving.webapp.food.FoodGroup;
import com.smartliving.webapp.food.FoodRepository;
import com.smartliving.webapp.meal.Meal;
import com.smartliving.webapp.meal.MealRepository;
import com.smartliving.webapp.user.User;
import com.smartliving.webapp.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
public class LoadDatabase {

    @Autowired
    PasswordEncoder passwordEncoder;

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    /**
     * Preloads the food repository
     * @param
     * @return
     */
    @Bean
    CommandLineRunner initDatabase(FoodRepository foodRepository, MealRepository mealRepository,
                                   DietRepository dietRepository, UserRepository userRepository,
                                   ExerciseRepository exerciseRepository, ExercisePlanRepository exercisePlanRepository){
        // Sample Diet

        // Breakfast Foods
        Food almondMilk = new Food("Almond Milk", 30,1,3,1, FoodGroup.DAIRY);
        Food honeyNutCheerios = new Food("Honey Nut Cheerios", 140, 30, 2,3,FoodGroup.GRAIN);

        // Lunch Foods
        Food apple = new Food("Apple", 40, 10, 0,0, FoodGroup.FRUIT);
        Food whiteBread = new Food("White Bread", 90, 19,0,3, FoodGroup.GRAIN);
        Food ham = new Food("Ham", 50, 1,2,8, FoodGroup.MEAT);
        Food cheese = new Food("Cheese", 120, 10,1,6,FoodGroup.DAIRY);
        Food mayo = new Food("Mayo", 90,0,10,0, FoodGroup.FATS_OILS);


        List<Food> foods = Arrays.asList(almondMilk,honeyNutCheerios,apple,whiteBread,ham,cheese,mayo);
        foodRepository.saveAll(foods);

        Meal breakfast = new Meal("Breakfast");
        breakfast.addFood(almondMilk);
        breakfast.addFood(honeyNutCheerios);

        Meal lunch = new Meal("Lunch");
        lunch.addFood(whiteBread);
        lunch.addFood(ham);
        lunch.addFood(cheese);
        lunch.addFood(mayo);
        lunch.addFood(apple);

        DietPlan smartDiet = new DietPlan("Smart Diet");
        smartDiet.addMeal(breakfast);
        smartDiet.addMeal(lunch);


        User user = new User("jordan","jordan@gmail.com",passwordEncoder.encode("password"));
        user.addDietPlan(smartDiet);
        userRepository.save(user);

        User user1 = new User("j","jordan12@gmail.com",passwordEncoder.encode("j"));
        userRepository.save(user1);

        Exercise bicepCurl = new Exercise("Bicep Curl", "Bicep", "Dumbbells");
        Exercise backSquat = new Exercise("Back Squat", "Lower Body", "Barbell");
        Exercise deadlift = new Exercise("Conventional Deadlift", "Lower Body", "Barbell");
        Exercise benchPress = new Exercise("Bench Press", "Chest", "Barbell");
        Exercise reverseChestFly = new Exercise("Reverse Chest Fly", "Back", "Dumbbells");
        exerciseRepository.save(bicepCurl);
        exerciseRepository.save(backSquat);
        exerciseRepository.save(deadlift);
        exerciseRepository.save(benchPress);
        exerciseRepository.save(reverseChestFly);

        ArrayList<ExercisePlanExercise> exercisesSetsReps = new ArrayList<>();
        exercisesSetsReps.add(new ExercisePlanExercise(5, 25, 25, false, bicepCurl));
        ExercisePlan exercisePlan = new ExercisePlan("Big body", exercisesSetsReps, user);
        exercisePlanRepository.save(exercisePlan);

        return args -> {
            log.info("Preloading " + foods);
            log.info("Preloading " + apple);
            log.info("Preloading " + breakfast);
            log.info("Preloading " + user);
            log.info("Preloading " + bicepCurl);
            log.info("Preloading " + exercisePlan);
            log.info("Preloading " + userRepository.save(new User("doe","doe@gmail.com","doepassword")));
        };
    }
}
