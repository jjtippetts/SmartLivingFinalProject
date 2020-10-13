package com.smartliving.webapp;

import com.smartliving.webapp.dietplan.DietPlan;
import com.smartliving.webapp.dietplan.DietRepository;
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
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;


public class TestConfig {

    @Autowired
    PasswordEncoder passwordEncoder;

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(FoodRepository foodRepository, MealRepository mealRepository, DietRepository dietRepository, UserRepository userRepository){
        // Sample Diet

        // Breakfast Foods
        Food almondMilk = new Food("Almond Milkkk", 30,1,3,1, FoodGroup.DAIRY);
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

        return args -> {
            log.info("Preloading " + foods);
            log.info("Preloading " + apple);
            log.info("Preloading " + breakfast);
            log.info("Preloading " + user);
            log.info("Preloading " + userRepository.save(new User("doe","doe@gmail.com","doepassword")));
        };
    }
}
