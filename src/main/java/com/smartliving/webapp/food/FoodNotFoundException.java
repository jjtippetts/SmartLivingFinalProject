package com.smartliving.webapp.food;

public class FoodNotFoundException extends RuntimeException {
    public FoodNotFoundException() {
        super("Could not find food");
    }
}
