package com.fit_set_go.springboot.service;

import com.fit_set_go.springboot.model.*;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.*;
import com.itextpdf.layout.*;
import com.itextpdf.layout.element.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;
import java.util.List;

@Service
public class MealPlanService {

    private static final Map<UserInput.Diet, List<Meal>> POOL = Map.of(
            UserInput.Diet.VEG, List.of(
                    new Meal("Paneer Wrap", "Paneer, roti, veg", 450, 28, 40, 18),
                    new Meal("Oats & Fruits", "Oats, milk, banana", 350, 15, 55, 8),
                    new Meal("Chickpea Salad", "Chickpeas, veg", 300, 16, 40, 6)
            ),
            UserInput.Diet.NONVEG, List.of(
                    new Meal("Grilled Chicken", "Chicken, rice, veg", 500, 45, 50, 10),
                    new Meal("Greek Yogurt Parfait", "Yogurt, berries", 300, 20, 35, 5),
                    new Meal("Egg Omelette", "Eggs, toast", 350, 25, 30, 15)
            )
    );

    public MealPlan generate(UserInput u, int targetCals) {
        var meals = new ArrayList<Meal>();
        int remaining = targetCals;
        for (Meal m : POOL.get(u.getDiet())) {
            if (remaining - m.getCalories() >= 0) {
                meals.add(m);
                remaining -= m.getCalories();
            }
        }
        return new MealPlan(targetCals - remaining, meals);
    }

    public byte[] toPdf(MealPlan plan) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document doc = new Document(pdf);

            PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);

            doc.add(new Paragraph("Daily Meal Plan").setFont(boldFont).setFontSize(16));
            doc.add(new Paragraph("Target Calories: " + plan.getTargetCalories()));

            Table table = new Table(5).useAllAvailableWidth();
            table.addHeaderCell("Meal");
            table.addHeaderCell("Calories");
            table.addHeaderCell("Protein (g)");
            table.addHeaderCell("Carbs (g)");
            table.addHeaderCell("Fat (g)");
            plan.getMeals().forEach(meal -> {
                table.addCell(meal.getName());
                table.addCell(String.valueOf(meal.getCalories()));
                table.addCell(String.valueOf(meal.getProtein()));
                table.addCell(String.valueOf(meal.getCarbs()));
                table.addCell(String.valueOf(meal.getFat()));
            });
            doc.add(table);
            doc.close();
            return baos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Failed to create PDF font", e);
        }
    }
}
