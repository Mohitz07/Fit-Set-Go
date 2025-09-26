package com.fit_set_go.springboot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class GlobalCorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // Allow your frontend origin
        config.setAllowedOrigins(List.of("http://localhost:8080", "https://localhost:8080", "https://fitsetgo.up.railway.app"));

        // Allow these HTTP methods
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Allow these headers
        config.setAllowedHeaders(List.of("Content-Type", "Authorization"));

        // Expose headers if frontend needs to read them
        config.setExposedHeaders(List.of("Content-Disposition"));

        // Allow credentials (cookies, Authorization headers) if required
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
