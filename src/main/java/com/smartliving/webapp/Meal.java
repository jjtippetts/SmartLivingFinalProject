package com.smartliving.webapp;

import java.util.ArrayList;

public class Meal {

    private String name;
    private ArrayList<Food> foods;

    public Meal(String name){
        if(name == null || name.equals("")){
            throw new IllegalArgumentException("Name of meal cannot be null");
        }
        this.name = name;

        foods = new ArrayList<>();
    }

    public void addFood(Food food){
        this.foods.add(food);
    }

    public ArrayList<Food> getFoods(){
        return foods;
    }

    @Override
    public String toString(){
        StringBuilder foodString = new StringBuilder();
        foodString.append(this.name).append("\n");
        for(Food food : foods){
            foodString.append(food.toString());
        }
        return foodString.toString();
    }
}
