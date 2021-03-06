package com.smartliving.webapp.user;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.smartliving.webapp.client.Client;
import com.smartliving.webapp.dietplan.DietPlan;
import com.smartliving.webapp.exercise.ExercisePlan;
import lombok.Data;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Data //Used to generate getters, setters, hash, equals, etc.
@Entity
public class User {
    //Generated Value IDENTITY auto increments per user created instead of globally
    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;

    @NotNull
    @Column(unique = true)
    private String username;

    @NotNull
    @Column(unique = true)
    private String email;

    @NotNull
    private String password;

    private String role;

    private boolean enabled;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<Client> clients;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<DietPlan> dietPlans;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<ExercisePlan> exercisePlans;

    private float weightInKgs;

    private float heightInMeters;

    private int activityLevel;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        dietPlans = new ArrayList<DietPlan>();
        clients = new ArrayList<Client>();
    }

    public User(){}

    public void addClient(Client client){
        client.setUser(this);
    }

    public void addClient(Client client, boolean set){
        if(client != null){
            this.clients.add(client);
            if(set){
                client.setUser(this, false);
            }
        }
    }

    public void addDietPlan(DietPlan dietPlan){
        dietPlan.setUser(this);
    }

    public void addDietPlan(DietPlan dietPlan, boolean set){
        if(dietPlan != null){
            this.dietPlans.add(dietPlan);
            if(set){
                dietPlan.setUser(this, false);
            }
        }
    }

    public void removeClient(Client client){
        this.clients.remove(client);
        client.setUser(null);
    }

    public void changeWeight(float weightInKgs){
        this.weightInKgs = weightInKgs;
    }

    public void changeHeight(float heightInMeters){
        this.heightInMeters = heightInMeters;
    }

    public void changeActivityLevel(int newActivityLevel) { this.activityLevel = newActivityLevel;}

    public String getActivityLevelString(){
        if(this.activityLevel == 1){
            return "Sedentary";
        } else if (this.activityLevel == 2){
            return "Slightly Active";
        } else if (this.activityLevel == 3){
            return "Active";
        } else {
            return "Very Active";
        }
    }

    public String toString() {
        return "User(id=" + this.getId() + ", username=" + this.getUsername() + ", email=" + this.getEmail() + ", password=" + this.getPassword() + ", role=" + this.getRole() + ", enabled=" + this.isEnabled() + ", clients=" + this.getClients() + ")";
    }
}
