package com.smartliving.webapp;

import org.springframework.data.jpa.repository.JpaRepository;

interface FoodRepository extends JpaRepository<Food, Long>{
}
