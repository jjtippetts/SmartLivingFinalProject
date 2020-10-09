package com.smartliving.webapp.food;

public class FoodNotFoundException extends RuntimeException {
    public FoodNotFoundException(Long id) {
        super("Could not find food " + id);
    }
}
