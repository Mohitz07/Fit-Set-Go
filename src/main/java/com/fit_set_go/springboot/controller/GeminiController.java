package com.fit_set_go.springboot.controller;

import com.fit_set_go.springboot.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/gemini")
@CrossOrigin // adjust or remove as needed
public class GeminiController {

    private final GeminiService geminiService;

    public GeminiController(GeminiService geminiService) {
        this.geminiService = geminiService;
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
            e.printStackTrace(); // ✅ Print to console
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}

