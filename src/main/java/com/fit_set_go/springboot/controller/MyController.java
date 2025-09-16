package com.fit_set_go.springboot.controller;

import com.fit_set_go.springboot.model.*;
import com.fit_set_go.springboot.service.*;
import org.springframework.security.core.Authentication;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class MyController {
    private final CalorieService calService;
    private final MealPlanService mealService;



    public MyController(CalorieService c, MealPlanService m) {
        this.calService = c; this.mealService = m;
    }

    @PostMapping("/calculate")
    public double calculate(@RequestBody UserInput input, Authentication auth) {
        // Save user input for history

        double calorieTarget = calService.target(input);
        return calorieTarget;
    }

//    @GetMapping("/api/userinfo")
//    public ResponseEntity<?> getUserInfo(Authentication auth) {
//        if (auth == null || !auth.isAuthenticated()) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
//        // Use UserService or directly build user info from principal
//        User user = userService.getUserByOauthId(auth.getName());
//        if (user == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//        return ResponseEntity.ok(Map.of(
//                "name", user.getName(),
//                "email", user.getEmail()
//        ));
//    }

}
