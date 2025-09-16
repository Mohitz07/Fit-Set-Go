package com.fit_set_go.springboot.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    private final HttpSession httpSession;

    public UserController(HttpSession httpSession) {
        this.httpSession = httpSession;
    }

    @GetMapping("/me")
    public Map<String, Object> getCurrentUser() {
        Map<String, Object> user = new HashMap<>();
        user.put("name", httpSession.getAttribute("name"));
        user.put("email", httpSession.getAttribute("email"));
        user.put("picture", httpSession.getAttribute("picture"));
        return user;
    }
}
