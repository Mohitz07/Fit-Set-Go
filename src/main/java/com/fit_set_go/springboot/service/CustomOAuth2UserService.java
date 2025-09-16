package com.fit_set_go.springboot.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final HttpSession httpSession;

    public CustomOAuth2UserService(HttpSession httpSession) {
        this.httpSession = httpSession;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User user = super.loadUser(userRequest);
        Map<String, Object> attributes = user.getAttributes();

        String oauthId = (String) attributes.get("sub");
        String name = (String) attributes.get("name");
        String email = (String) attributes.get("email");
        String picture = (String) attributes.get("picture");

        httpSession.setAttribute("oauthId", oauthId);
        httpSession.setAttribute("name", name);
        httpSession.setAttribute("email", email);
        httpSession.setAttribute("picture", picture);

        return user;
    }
}
