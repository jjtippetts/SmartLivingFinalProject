package com.smartliving.webapp.user;
import java.security.Principal;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private final UserRepository userRepository;

    UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    //User
    @PostMapping(path = "/user", consumes = MediaType.ALL_VALUE)
    User newUser(@RequestBody User newUser, Principal principal){
        String username = principal.getName();
        return userRepository.save(newUser);
    }
}
