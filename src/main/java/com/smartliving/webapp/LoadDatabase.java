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
     * @param repository name of the repository
     * @return
     */
    @Bean
    CommandLineRunner initDatabase(FoodRepository repository){
        return args -> {
            log.info("Preloading " + repository.save(new Food("Apple", 40, 10, 0,0)));
            log.info("Preloading " + repository.save(new Food("Greek Yogurt", 90, 10, 10,10)));
        };
    }
}
