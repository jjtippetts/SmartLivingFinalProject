package com.smartliving.webapp;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Data
@Entity
@Table()
public class Food {

    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY)  Long id;

    @NotNull
    private String name;
    @NotNull
    private int calories;
    @NotNull
    private int carbohydrates;
    @NotNull
    private int fat;
    @NotNull
    private int protein;
    @Enumerated
    private FoodGroup foodGroup = FoodGroup.UNDEFINED;

//    TO BE IMPLEMENTED
//    @NotNull
//    private String group;
//    @NotNull
//    private boolean approved;

    //@ManyToMany(cascade = {CascadeType.MERGE, CascadeType.REFRESH}, mappedBy = "foods", fetch = FetchType.LAZY)
    @JsonIgnore
    @ManyToMany(mappedBy = "foods")
    private List<Meal> meals;

    public void setMeals(List<Meal> meals){
        this.meals = meals;
    }

    public Food(String name, int calories, int carbohydrates, int fat, int protein, FoodGroup foodGroup){
//        if(name == null || name.equals("")){
//            throw new IllegalArgumentException("Name of food cannot be null");
//        }
        this.name = name;
        this.calories = calories;
        this.carbohydrates = carbohydrates;
        this.fat = fat;
        this.protein = protein;
        if(foodGroup == null){
            this.foodGroup = FoodGroup.UNDEFINED;
        }
        this.foodGroup = foodGroup;

        this.meals = new ArrayList<>();
    }

    public Food(String name, int calories, int carbohydrates, int fat, int protein){
        this(name,calories,carbohydrates,fat,protein, FoodGroup.UNDEFINED);
    }

    public Food(){}

    public String toString() {
        return "Food(id=" + this.getId() + ", name=" + this.getName() + ", calories=" + this.getCalories() + ", carbohydrates=" + this.getCarbohydrates() + ", fat=" + this.getFat() + ", protein=" + this.getProtein() + ", foodGroup=" + this.foodGroup + ")";
    }

}
