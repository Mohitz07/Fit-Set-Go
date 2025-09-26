package com.fit_set_go.springboot.model;

import lombok.Data;

@Data
public class UserInput {
    // Enums can stay as inner classes for logical grouping
    public enum Sex { MALE, FEMALE }
    public enum Goal { MAINTAIN, LOSE, GAIN }
    public enum Diet { VEG, NONVEG }

    private int age;
    private double heightCm;
    private double weightKg;
    private Sex sex;
    private double activityFactor; // 1.2‒1.9
    private Goal goal;
    private Diet diet;
}
