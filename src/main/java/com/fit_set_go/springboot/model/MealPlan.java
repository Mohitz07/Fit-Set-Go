package com.fit_set_go.springboot.model;

import java.util.ArrayList;
import java.util.List;
import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class MealPlan {
    private int targetCalories;
    private List<Meal> meals = new ArrayList<>();
}
