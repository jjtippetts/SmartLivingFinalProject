package com.smartliving.webapp;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/")
    public String toIndex(Model model) {
        model.addAttribute("homeActive", "active");
        return "landing";
    }

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