package com.fit_set_go.springboot.model;

import java.util.ArrayList;
import java.util.List;

public class MealPlan {
    private int targetCalories;
    private List<Meal> meals = new ArrayList<>();

    public MealPlan(int targetCalories, List<Meal> meals) {
        this.targetCalories = targetCalories;
        this.meals = meals;
    }

    public int getTargetCalories() {
        return targetCalories;
    }

    public void setTargetCalories(int targetCalories) {
        this.targetCalories = targetCalories;
    }

    public List<Meal> getMeals() {
        return meals;
    }

    public void setMeals(List<Meal> meals) {
        this.meals = meals;
    }
}
