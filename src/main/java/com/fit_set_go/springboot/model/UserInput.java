package com.fit_set_go.springboot.model;

public class UserInput {
    public enum Sex { MALE, FEMALE }
    public enum Goal { MAINTAIN, LOSE, GAIN }
    public enum Diet { VEG, NONVEG }

    private int age;
    private double heightCm;
    private double weightKg;
    private Sex sex;
    private double activityFactor;          // 1.2‒1.9
    private Goal goal;
    private Diet diet;

    // Getters
    public int getAge() {
        return age;
    }

    public double getHeightCm() {
        return heightCm;
    }

    public double getWeightKg() {
        return weightKg;
    }

    public Sex getSex() {
        return sex;
    }

    public double getActivityFactor() {
        return activityFactor;
    }

    public Goal getGoal() {
        return goal;
    }

    public Diet getDiet() {
        return diet;
    }

    // Setters
    public void setAge(int age) {
        this.age = age;
    }

    public void setHeightCm(double heightCm) {
        this.heightCm = heightCm;
    }

    public void setWeightKg(double weightKg) {
        this.weightKg = weightKg;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public void setActivityFactor(double activityFactor) {
        this.activityFactor = activityFactor;
    }

    public void setGoal(Goal goal) {
        this.goal = goal;
    }

    public void setDiet(Diet diet) {
        this.diet = diet;
    }
}
