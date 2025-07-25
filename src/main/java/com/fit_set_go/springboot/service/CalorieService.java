package com.fit_set_go.springboot.service;

import com.fit_set_go.springboot.model.UserInput;
import org.springframework.stereotype.Service;

@Service
public class CalorieService {

    /** Mifflin-St Jeor equation */            // males: +5, females: −161 [3]
    public double maintenance(UserInput u) {
        double sexConst = (u.getSex() == UserInput.Sex.MALE) ? 5 : -161;
        return (10 * u.getWeightKg() + 6.25 * u.getHeightCm() - 5 * u.getAge() + sexConst)
                * u.getActivityFactor();
    }

    public double target(UserInput u) {
        double maintain = maintenance(u);
        return switch (u.getGoal()) {
            case LOSE -> maintain - 500;           // ≈500 kcal deficit
            case GAIN -> maintain + 300;           // ≈300 kcal surplus
            default -> maintain;
        };
    }
}
