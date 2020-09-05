package com.smartliving.webapp;

import lombok.Data;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class DietPlan {

    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY)  Long id;

    @NotNull
    private String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "dietPlan")
    private List<Meal> meals;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn (name="USER_ID")
    private User user;


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

    public void setUser(User user){
        setUser(user, true);
    }

    void setUser(User user, boolean add){
        this.user = user;
        if(user != null && add){
            user.addDietPlan(this,false);
        }
    }

    public String toString() {
        return "DietPlan(id=" + this.getId() + ", name=" + this.getName() + ", meals=" + this.meals.toString() + ", user=" + this.user.toString() + ")";
    }
}
