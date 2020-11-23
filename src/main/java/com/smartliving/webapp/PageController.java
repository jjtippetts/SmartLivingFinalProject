package com.smartliving.webapp;

import com.smartliving.webapp.user.User;
import com.smartliving.webapp.user.UserCreationFormViewModel;
import com.smartliving.webapp.user.UserNotFoundException;
import com.smartliving.webapp.user.UserService;
import com.smartliving.webapp.userdetails.MyUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class PageController {

    private final UserService userService;

    @Autowired
    public PageController(UserService userService) {
        this.userService = userService;
    }

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

    @GetMapping("/login")
    public String toLogin(Model model) {
        model.addAttribute("userCreationForm", new UserCreationFormViewModel());
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(!(auth instanceof AnonymousAuthenticationToken)){
            model.addAttribute("homeActive", "active");
            return "landing";
        } else {
            return "login";
        }
    }

    @GetMapping(path = "/settings")
    public String toSettings(Model model, @AuthenticationPrincipal MyUserDetails userDetails ) throws UserNotFoundException {
        User currentUser = userService.getUser(userDetails.getUsername());

        model.addAttribute("currentUserName", currentUser.getUsername());
        model.addAttribute("currentUserEmail", currentUser.getEmail());
        model.addAttribute("currentUserPassword", currentUser.getPassword());
        model.addAttribute("currentUserWeight", currentUser.getWeightInKgs());
        model.addAttribute("currentUserHeight", currentUser.getHeightInMeters());

//        String currentUserName = principal.getName();
//        User user = userRepository.getUserByUsername(username);
//
//        if (!(auth instanceof AnonymousAuthenticationToken)) {
//            currentUserName = auth.getName();
//            model.addAttribute("currentUserName", currentUserName);
//        }

        model.addAttribute("dietActive", "active");
        return "settings";
    }
}