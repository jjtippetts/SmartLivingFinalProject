package com.smartliving.webapp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoadDatabase {

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
        Meal breakfast = new Meal("Breakfast");
        mealRepository.save(breakfast);
        breakfast.addFood(apple);
        mealRepository.save(breakfast);
        Meal lunch = new Meal("Lunch");
        mealRepository.save(lunch);
        lunch.addFood(apple);
        mealRepository.save(lunch);

        DietPlan smartDiet = new DietPlan("Smart Diet");
        dietRepository.save(smartDiet);
        smartDiet.addMeal(lunch);
        dietRepository.save(smartDiet);


        return args -> {
            log.info("Preloading " + apple);
            log.info("Preloading " + breakfast);
            log.info("Preloading " + foodRepository.save(new Food("Greek Yogurt", 90, 10, 10,10)));
            log.info("Preloading " + userRepository.save(new User("joe@gmail.com","secretpassword")));
            log.info("Preloading " + userRepository.save(new User("doe@gmail.com","doepassword")));
        };
    }
}
