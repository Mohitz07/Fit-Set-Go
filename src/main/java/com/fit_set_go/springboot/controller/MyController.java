package com.fit_set_go.springboot.controller;

import com.fit_set_go.springboot.model.*;
import com.fit_set_go.springboot.service.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

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
    public double calculate(@RequestBody UserInput input) {
        return calService.target(input);
    }
}
