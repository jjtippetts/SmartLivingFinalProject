package com.smartliving.webapp.unittests;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.smartliving.webapp.food.Food;
import com.smartliving.webapp.food.FoodGroup;
import com.smartliving.webapp.food.FoodNotFoundException;
import com.smartliving.webapp.food.FoodRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

/**
 * Tests the Food Repository.
 */
@DataJpaTest
public class FoodRepositoryTest {

    @Autowired
    FoodRepository repository;

    @Test
    public void savedFoodInDatabaseStoresFoodCorrectly(){
        Food pear = new Food("pear",30,6,0,1, FoodGroup.FRUIT);
        Food savedFood = repository.save(pear);
        assertThat(savedFood,equalTo(pear));
    }

    @Test
    public void searchForFoodNotInDatabaseReturns0TotalElements(){
        Pageable pageable = PageRequest.of(0,5).first();
        Page<Food> foundFood = repository.findAllByNameContainingIgnoreCase("xxxvxsdfg", pageable);
        assertThat(foundFood.getTotalElements(),equalTo(0L));
    }

    @Test
    public void searchFoodByFoodGroupReturnsCorrectNumberOfFoods(){
        Food pear = new Food("pear",30,6,0,1, FoodGroup.FRUIT);
        repository.save(pear);
        Food apple = new Food("pear",50,8,0,1, FoodGroup.FRUIT);
        repository.save(apple);

        Pageable pageable = PageRequest.of(0,5).first();
        Page<Food> foundFood = repository.findByFoodGroup(FoodGroup.FRUIT, pageable);
        assertThat(foundFood.getTotalElements(),equalTo(2L));
    }

}
