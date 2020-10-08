package com.smartliving.webapp;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface FoodRepository extends JpaRepository<Food, Long>{

    Page<Food> findAllByNameContainingIgnoreCase(String name, Pageable pageable);

    List<Food> findByName(String name);

    List<Food> findByNameContainingIgnoreCase(String name);

    List<Food> findByFoodGroup(FoodGroup foodGroup);
}
