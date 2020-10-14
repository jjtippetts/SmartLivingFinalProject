package com.smartliving.webapp.food;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * When a FoodNotFoundException is thrown the controller adds the following to the response
 */
@ControllerAdvice
public class FoodNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler (FoodNotFoundException.class)
    @ResponseStatus (HttpStatus.NOT_FOUND)
    String foodNotFoundHandler(FoodNotFoundException ex){
        return ex.getMessage();
    }
}
