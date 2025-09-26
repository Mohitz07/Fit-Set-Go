package com.fit_set_go.springboot.controller;

import com.fit_set_go.springboot.model.UserInput;
import com.fit_set_go.springboot.service.CalorieService;
import com.fit_set_go.springboot.service.MealPlanService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class MyController {
    private final CalorieService calService;
    private final MealPlanService mealService;

    public MyController(CalorieService c, MealPlanService m) {
        this.calService = c;
        this.mealService = m;
    }

    @PostMapping("/calculate")
    public double calculate(@RequestBody UserInput input) {
        return calService.target(input);
    }
}
