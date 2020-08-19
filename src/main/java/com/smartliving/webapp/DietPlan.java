package com.smartliving.webapp;

import java.util.ArrayList;

public class DietPlan {

    private String name;
    private ArrayList<Meal> meals;

    public DietPlan(String name){
        if(name == null || name.equals("")){
            throw new IllegalArgumentException("Name of Diet Plan cannot be null");
        }
        this.name = name;

        meals = new ArrayList<>();
    }

    public void addMeal(Meal meal){
        this.meals.add(meal);
    }

    public ArrayList<Meal> getMeals(){
        return this.meals;
    }

    public void listMeals(){
        for(Meal meal : this.meals){
            System.out.println(meal);
        }
    }

}
