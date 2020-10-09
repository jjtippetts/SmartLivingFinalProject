package com.smartliving.webapp;

import static org.assertj.core.api.Assertions.assertThat;

import com.smartliving.webapp.food.FoodController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class FoodControllerTest {

    @Autowired
    FoodController controller;

    @Test
    public void contextLoads() throws Exception{
        assertThat(controller).isNotNull();
    }
}
