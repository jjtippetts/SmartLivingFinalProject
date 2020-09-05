package com.smartliving.webapp;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Client {
    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;

    @Column(unique = true)
    @NotNull
    private String name;

    @NotNull
    private int height; //Inches

    @NotNull
    private int weight; //Pounds

    @NotNull
    private int age;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn (name="USER_ID")
    private User user;

    public Client(){}

    public Client(String name, int height, int weight, int age){
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.age = age;
    }

    public void setUser(User user){
        setUser(user, true);
    }

    void setUser(User user, boolean add){
        this.user = user;
        if(user != null && add){
            user.addClient(this,false);
        }
    }
}
