package com.smartliving.webapp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

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
    CommandLineRunner initDatabase(FoodRepository foodRepository, MealRepository mealRepository, DietRepository dietRepository, UserRepository userRepository){
        Food apple = new Food("Apple", 40, 10, 0,0);
        foodRepository.save(apple);
        Food applePie = new Food("Apple Pie", 200, 20, 8, 3);
        foodRepository.save(applePie);
        Meal breakfast = new Meal("Breakfast");
        breakfast.addFood(apple);

        Meal lunch = new Meal("Lunch");
        lunch.addFood(apple);

        DietPlan smartDiet = new DietPlan("Smart Diet");
        smartDiet.addMeal(lunch);
        smartDiet.addMeal(breakfast);

        User user = new User("jordan","jordan@gmail.com",passwordEncoder.encode("password"));
        user.addDietPlan(smartDiet);
        userRepository.save(user);

        return args -> {
            log.info("Preloading " + apple);
            log.info("Preloading " + breakfast);
            log.info("Preloading " + foodRepository.save(new Food("Ham", 90, 10, 10,10)));
            log.info("Preloading " + user);
            log.info("Preloading " + userRepository.save(new User("doe","doe@gmail.com","doepassword")));
        };
    }
}
