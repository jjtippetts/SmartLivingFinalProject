package com.smartliving.webapp.meal;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.smartliving.webapp.dietplan.DietPlan;
import com.smartliving.webapp.food.Food;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Table(
        uniqueConstraints=
        @UniqueConstraint(columnNames={"DIET_PLAN_ID", "NAME"})
)
@Entity
public class Meal {

    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY)  Long id;

    @NotNull
    private String name;

    //@ManyToMany(cascade = {CascadeType.MERGE, CascadeType.REFRESH}, fetch = FetchType.LAZY)
    @ManyToMany(cascade = {CascadeType.REFRESH}, fetch = FetchType.LAZY)
    @JoinTable(name = "meal_foods",
        joinColumns = {
            @JoinColumn(name = "meal_id", referencedColumnName = "id")},
        inverseJoinColumns = {
            @JoinColumn(name = "food_id", referencedColumnName = "id")})
    private List<Food> foods;


    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn (name="DIET_PLAN_ID")
    @JsonBackReference
    private DietPlan dietPlan;

    public Meal(String name){
        if(name == null || name.equals("")){
            throw new IllegalArgumentException("Name of meal cannot be null");
        }
        this.name = name;
        this.foods = new ArrayList<>();
    }

    public Meal(String name, DietPlan dietPlan){
        if(name == null || name.equals("")){
            throw new IllegalArgumentException("Name of meal cannot be null");
        }
        this.name = name;
        this.foods = new ArrayList<>();
        this.dietPlan = dietPlan;
    }

    public Meal(){}

    public void setDiet(DietPlan dietPlan){
        setDiet(dietPlan, true);
    }

    public void setDiet(DietPlan dietPlan, boolean add){
        this.dietPlan = dietPlan;
        if(dietPlan != null && add){
            dietPlan.addMeal(this,false);
        }
    }

    public void addFood(Food food){
        this.foods.add(food);
    }

    public void removeFood(Food food){
        this.foods.remove(food);
    }

    public String toString() {
        return "Meal(id=" + this.getId() + ", name=" + this.getName() + ", meal=" + foods.toString() + ")";
    }

    public Long getId() {
        return this.id;
    }

    public @NotNull String getName() {
        return this.name;
    }

    public List<Food> getFoods() {
        return this.foods;
    }

    public @NotNull DietPlan getDietPlan() {
        return this.dietPlan;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(@NotNull String name) {
        this.name = name;
    }

    public void setFoods(List<Food> foods) {
        this.foods = foods;
    }

    public void setDietPlan(@NotNull DietPlan dietPlan) {
        this.dietPlan = dietPlan;
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof Meal)) return false;
        final Meal other = (Meal) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$id = this.getId();
        final Object other$id = other.getId();
        if (this$id == null ? other$id != null : !this$id.equals(other$id)) return false;
        final Object this$name = this.getName();
        final Object other$name = other.getName();
        if (this$name == null ? other$name != null : !this$name.equals(other$name)) return false;
        final Object this$foods = this.getFoods();
        final Object other$foods = other.getFoods();
        if (this$foods == null ? other$foods != null : !this$foods.equals(other$foods)) return false;
        final Object this$dietPlan = this.getDietPlan();
        final Object other$dietPlan = other.getDietPlan();
        if (this$dietPlan == null ? other$dietPlan != null : !this$dietPlan.equals(other$dietPlan)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof Meal;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $id = this.getId();
        result = result * PRIME + ($id == null ? 43 : $id.hashCode());
        final Object $name = this.getName();
        result = result * PRIME + ($name == null ? 43 : $name.hashCode());
        final Object $foods = this.getFoods();
        result = result * PRIME + ($foods == null ? 43 : $foods.hashCode());
        final Object $dietPlan = this.getDietPlan();
        result = result * PRIME + ($dietPlan == null ? 43 : $dietPlan.hashCode());
        return result;
    }
}
