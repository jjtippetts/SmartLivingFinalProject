package com.smartliving.webapp;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.smartliving.webapp.dietplan.DietRepository;
import com.smartliving.webapp.food.Food;
import com.smartliving.webapp.food.FoodController;
import com.smartliving.webapp.food.FoodGroup;
import com.smartliving.webapp.food.FoodRepository;
import com.smartliving.webapp.meal.MealRepository;
import com.smartliving.webapp.user.UserRepository;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.context.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc()
public class FoodControllerTest {

//    @LocalServerPort
//    private int port;

//    @Autowired
//    FoodController controller;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MealRepository mealRepository;

    @Autowired
    private DietRepository dietRepository;

//    @Test
//    public void contextLoads() throws Exception{
//        assertThat(controller,notNullValue());
//
//    }
//
//    @Test
//    public void foodNotFoundReturnsError(){
//        assertThat(controller.findFoodByFoodGroup(FoodGroup.MIXED),is(2));
//    }

//    @Test
//    public void shouldReturnNull() throws Exception {
//        this.mockMvc.perform(get("/")).andDo(print()).andExpect(status().isOk());
//    }

    @BeforeEach
    public void setup(){
        MockitoAnnotations.initMocks(this);
    }

    @WithMockUser
    @Test
    public void validInputReturns200() throws Exception{

        mockMvc.perform(get("/food").param("foodGroup",FoodGroup.FRUIT.toString())).andDo(print()).andExpect(status().isOk()).andExpect(content().string(containsString("Hello World")));
    }

    @WithMockUser
    @Test
    public void postFood() throws Exception{
        String json =
                "{\"name\":\"pear\",\"calories\":\"200\",\"carbohydrates\":\"20\",\"fat\":\"2\",\"protein\":\"2\"}";
        Food pear = new Food("pear",200,20,2,2,FoodGroup.FRUIT);
        mockMvc.perform(post("/food").content(json).contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk()).andExpect(content().string("hello"));
    }

}
