package com.smartliving.webapp;

import lombok.Data;

import javax.persistence.*;

import java.util.Date;
import java.util.Objects;

@Data //Used to generate getters, setters, hash, equals, etc.
@Entity
public class User {
    //Generated Value IDENTITY auto increments per user created instead of globally
    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    private String email;
    private String password;

//    private String firstName;
//    private String lastName;
//    private Date birthDate;
//    private Date birthDate;
//    private Date creationDate;
//    private String street;
//    private String city;
//    private String state;
//    private String zip;
//    private String phone;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
//        this.birthDate = birthDate;
//        this.creationDate = null;
//        this.street = street;
//        this.city = city;
//        this.state = state;
//        this.zip = zip;
//        this.phone = phone;
    }

}
