package com.fit_set_go.springboot.controller;

import com.fit_set_go.springboot.service.GeminiService;
import com.fit_set_go.springboot.service.MealPlanService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/gemini")
@CrossOrigin // adjust or remove as needed
public class GeminiController {

    private final GeminiService geminiService;
    private final MealPlanService mealPlanService;
    public GeminiController(GeminiService geminiService, MealPlanService mealPlanService) {
        this.geminiService = geminiService;
        this.mealPlanService = mealPlanService;
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generate(@RequestBody Map<String, String> body) {
        String prompt = body.get("prompt");
        if (prompt == null || prompt.isEmpty()) {
            return ResponseEntity.badRequest().body("Prompt must not be empty");
        }
        try {
            String result = geminiService.generateContent(prompt);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
    @PostMapping("/pdf")
    public ResponseEntity<byte[]> generateGeminiPdf(@RequestBody Map<String, String> body) {
        String text = body.get("text");
        if (text == null || text.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        byte[] pdf = mealPlanService.plainTextToPdf(text);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=Fit-Set-Go-meal-plan.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }


}

