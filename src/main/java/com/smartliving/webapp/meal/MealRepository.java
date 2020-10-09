package com.smartliving.webapp.meal;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealRepository extends JpaRepository<Meal, Long> {

    List<Meal> findByName(String name);
    List<Meal> findByNameContaining(String name);
    Meal findByNameAndAndDietPlan_Id(String name, Long dietPlan);
}

