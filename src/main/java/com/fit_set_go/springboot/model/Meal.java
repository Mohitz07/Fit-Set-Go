package com.fit_set_go.springboot.model;

import lombok.*;

@Data
public class Meal {
    private String name;
    private String ingredients;
    private int calories;
    private int protein;
    private int carbs;
    private int fat;
}
