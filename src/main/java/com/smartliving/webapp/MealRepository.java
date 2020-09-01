package com.smartliving.webapp;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface MealRepository extends JpaRepository<Meal, Long> {

    List<Meal> findByName(String name);
    List<Meal> findByNameContaining(String name);
}

