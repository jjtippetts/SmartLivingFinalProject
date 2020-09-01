package com.smartliving.webapp;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class DietPlan {

    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY)  Long id;
    private String name;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "dietPlan")
    private List<Meal> meals;

    public DietPlan(String name){
        if(name == null || name.equals("")){
            throw new IllegalArgumentException("Name of Diet Plan cannot be null");
        }
        this.name = name;
        meals = new ArrayList<Meal>();
    }
    public DietPlan(){}

    public void addMeal(Meal meal){
        meal.setDiet(this);
    }

    void addMeal(Meal meal, boolean set){
        if(meal != null){
            this.meals.add(meal);
            if(set){
                meal.setDiet(this, false);
            }
        }
    }

    public void removeMeal(Meal meal){
        this.meals.remove(meal);
        meal.setDiet(null);
    }

    public void listMeals(){
        for(Meal meal : this.meals){
            System.out.println(meal);
        }
    }

}
