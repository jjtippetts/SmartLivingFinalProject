package com.smartliving.webapp;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Entity;
import java.util.Objects;

@Entity
public class Food {

    private @Id @GeneratedValue Long id;
    private String name;
    private int calories;
    private int carbohydrates;
    private int fat;
    private int protein;

    public Food(){}

    public Food(String name, int calories, int carbohydrates, int fat, int protein){
        if(name == null || name.equals("")){
            throw new IllegalArgumentException("Name of food cannot be null");
        }
        this.name = name;
        this.calories = calories;
        this.carbohydrates = carbohydrates;
        this.fat = fat;
        this.protein = protein;
    }

    public Long getId(){
        return this.id;
    }

    public String getName(){
        return this.name;
    }

    public int getCalories(){
        return this.calories;
    }

    public int getCarbohydrates(){
        return this.carbohydrates;
    }

    public int getFat(){
        return this.fat;
    }

    public int getProtein(){
        return this.protein;
    }

    public void editNutrientFacts(String nutrient, int value){
        if(nutrient.equals("calories")){
            this.calories = value;
        }
    }

    @Override
    public String toString(){
        return "Name: " + name + "\n" +
                "Calories: " + calories + "\n" +
                "Carbohydrates: " + carbohydrates + "\n" +
                "Fat: " + fat + "\n" +
                "Protein: " + protein + "\n";
    }

    @Override
    public int hashCode(){
        return Objects.hash(this.id, this.name, this.calories, this.carbohydrates, this.fat, this.protein);
    }
}
