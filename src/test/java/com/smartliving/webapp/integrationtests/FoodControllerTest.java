package com.smartliving.webapp.integrationtests;


import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.smartliving.webapp.food.Food;
import com.smartliving.webapp.food.FoodGroup;
import com.smartliving.webapp.food.FoodNotFoundException;
import com.smartliving.webapp.food.FoodRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

/**
 * Tests the interaction between the controller and database
 * Need @WithMockUser to Bypass Spring security
 */
@SpringBootTest
@AutoConfigureMockMvc()
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ActiveProfiles("default")
public class FoodControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private FoodRepository repository;

    @BeforeAll
    public void initFoodDatabase(){
        Food lettuce = new Food("lettuce", 20, 4, 0, 1, FoodGroup.VEGETABLE);
        Food banana = new Food("banana", 60, 14, 0, 1, FoodGroup.FRUIT);
        Food rice = new Food("rice", 100, 18, 2, 6, FoodGroup.GRAIN);
        List<Food> foods = Arrays.asList(lettuce, banana, rice);
        repository.saveAll(foods);
    }

    @WithMockUser
    @Test
    public void validFoodSearchReturns200AndFoodInfo() throws Exception{
        mockMvc.perform(get("/food/lettuce").param("page","0")).andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString("lettuce")));
    }

    @WithMockUser
    @Test
    public void FoodSearchThatResultsInNoFoodsReturnsNotFound() throws Exception{
        mockMvc.perform(get("/food/xxxxxxxxxxx").param("page","0")).andDo(print()).andExpect(status().isNotFound())
                .andExpect(content().string(containsString("Could not find food")));
    }


    @WithMockUser
    @Test
    public void postFood() throws Exception{
        String json =
                "{\"name\":\"pear\",\"calories\":\"200\",\"carbohydrates\":\"20\",\"fat\":\"2\",\"protein\":\"2\"}";
        Food pear = new Food("pear",200,20,2,2,FoodGroup.FRUIT);
        mockMvc.perform(post("/food").content(json).contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)).andDo(print())
                .andExpect(status().isOk()).andExpect(content().string(containsString("pear")));
    }

}
