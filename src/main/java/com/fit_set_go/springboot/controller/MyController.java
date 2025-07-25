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

    @PostMapping("/mealplan/pdf")
    public ResponseEntity<byte[]> mealPlanPdf(@RequestBody UserInput input) {
        int target = (int)Math.round(calService.target(input));
        MealPlan plan = mealService.generate(input, target);
        byte[] pdf = mealService.toPdf(plan);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=mealplan.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}

