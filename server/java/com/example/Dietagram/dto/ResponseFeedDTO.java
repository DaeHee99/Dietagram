package com.example.Dietagram.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResponseFeedDTO {

    private long id;
    private String content;
    private ResponseFeedImageDTO responseFeedImageDTO;
    private ResponseFeedCommentDTO responseFeedCommentDTO;




}
