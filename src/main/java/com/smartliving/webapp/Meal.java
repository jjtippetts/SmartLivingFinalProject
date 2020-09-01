package com.smartliving.webapp;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Meal {

    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY)  Long id;

    @NotNull
    private String name;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "meal_foods",
        joinColumns = {
            @JoinColumn(name = "meal_id", referencedColumnName = "id")},
        inverseJoinColumns = {
            @JoinColumn(name = "food_id", referencedColumnName = "id")})
    private List<Food> foods;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn (name="DIET_PLAN_ID")
    private DietPlan dietPlan;

    public Meal(String name){
        if(name == null || name.equals("")){
            throw new IllegalArgumentException("Name of meal cannot be null");
        }
        this.name = name;

        foods = new ArrayList<>();
    }

    public Meal(){}

    public void setDiet(DietPlan dietPlan){
        setDiet(dietPlan, true);
    }

    void setDiet(DietPlan dietPlan, boolean add){
        this.dietPlan = dietPlan;
        if(dietPlan != null && add){
            dietPlan.addMeal(this,false);
        }
    }

    void addFood(Food food){
        this.foods.add(food);
    }

    public void removeFood(Food food){
        this.foods.remove(food);
    }

    public String toString() {
        return "Meal(id=" + this.getId() + ", name=" + this.getName() + ", meal=" + foods.toString() + ")";
    }

}
