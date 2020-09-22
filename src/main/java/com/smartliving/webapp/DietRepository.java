package com.smartliving.webapp;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

interface DietRepository extends JpaRepository<DietPlan, Long> {

    List<DietPlan> findByName(String name);
    List<DietPlan> findByNameContaining(String name);
    List<DietPlan> findByUser_Id(Long Id);
}
