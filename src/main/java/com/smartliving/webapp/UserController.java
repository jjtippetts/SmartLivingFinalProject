package com.smartliving.webapp;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private final UserRepository repository;

    UserController(UserRepository repository){
        this.repository = repository;
    }

//    @GetMapping("/food/{name}")
//    List<Food> multiple(@PathVariable String name){
//        return repository.findByNameContaining(name);
//    }
}
