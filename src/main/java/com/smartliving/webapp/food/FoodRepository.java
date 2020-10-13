package com.smartliving.webapp.food;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Long>{

    Page<Food> findAllByNameContainingIgnoreCase(String name, Pageable pageable);

    List<Food> findByName(String name);

    List<Food> findByNameContainingIgnoreCase(String name);

    Page<Food> findByFoodGroup(FoodGroup foodGroup, Pageable pageable);
}
