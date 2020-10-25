package com.smartliving.webapp.user;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder.MethodArgumentBuilder;

@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(path = "/create-user", consumes = MediaType.ALL_VALUE)
    public User newUser(@Valid @RequestBody UserCreationFormViewModel newUserForm){
        return userService.saveUser(newUserForm);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, List<String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        HashMap<String, List<String>> errorResult = new HashMap<>() {};
        ArrayList<String> errors = new ArrayList<>();
        for(ObjectError error: ex.getBindingResult().getAllErrors()) {
            errors.add(error.getDefaultMessage());
        }

        errorResult.put("errors", errors);
        return errorResult;
    }
}
