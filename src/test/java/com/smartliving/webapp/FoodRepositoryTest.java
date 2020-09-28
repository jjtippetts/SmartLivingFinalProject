package com.smartliving.webapp;

import static org.hamcrest.CoreMatchers.*;
import static org.hamcrest.MatcherAssert.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

@DataJpaTest
public class FoodRepositoryTest {

    @Autowired
    FoodRepository repository;

    @Test
    public void testFoodSavesInRepository(){
        Food pear = new Food("pear",30,6,0,1,FoodGroup.FRUIT);
        repository.save(pear);
        assertThat(repository.findByName("pear"),is(notNullValue()));
    }

}
