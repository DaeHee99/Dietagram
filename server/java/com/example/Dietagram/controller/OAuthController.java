package com.example.Dietagram.controller;

import com.example.Dietagram.domain.Feed;
import com.example.Dietagram.domain.FeedComment;
import com.example.Dietagram.domain.User;
import com.example.Dietagram.dto.HomeDTO;
import com.example.Dietagram.service.FeedService;
import com.example.Dietagram.service.OAuthService;
import com.example.Dietagram.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/oauth")
public class OAuthController {

    @Autowired
    UserService userService;

    @Autowired
    OAuthService oAuthService;

    @Autowired
    FeedService feedService;



    @GetMapping("/loginInfo")
    public ResponseEntity<?> oauthLoginInfo(Authentication authentication) throws UnsupportedEncodingException , IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        System.out.println("attributes = "+ attributes);
        System.out.println("oAuthUser = "+ oAuth2User);
        User user = userService.getUserFromAttributeId(attributes);
        oAuthService.setTokenInUser(user);
        List<Feed> feedList = feedService.getAllFeeds(user);

        HomeDTO homeDTO = HomeDTO.builder().token(user.getToken())
                .nickname(user.getNickname()).feedList(feedList).build();

//        if(user.getFollowingList().isEmpty()){
//            return ResponseEntity.ok().body(homeDTO);
//        }
//
//        System.out.println("USERTOKEN@@@@@@@@@@@@@@@@@@@@@@  " + user.getToken());
//
//        if(feedList.isEmpty()){
//            return ResponseEntity.ok().body(homeDTO);
//        }

        return ResponseEntity.ok().body(homeDTO);
    }




}
