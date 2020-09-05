package com.smartliving.webapp;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PageController {

    @GetMapping("/diet")
    public String toDiet(Model model) {
        model.addAttribute("dietActive", "active");
        return "diet";
    }

    @GetMapping("/exercise")
    public String toExercise(Model model) {
        model.addAttribute("exerciseActive", "active");
        return "exercise";
    }

    @GetMapping("/login")
    public String toLogin(Model model) {
        return "login";
    }

}