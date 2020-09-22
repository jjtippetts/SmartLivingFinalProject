package com.smartliving.webapp;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface FoodRepository extends JpaRepository<Food, Long>{

    List<Food> findByName(String name);

    List<Food> findByNameContainingIgnoreCase(String name);
}
