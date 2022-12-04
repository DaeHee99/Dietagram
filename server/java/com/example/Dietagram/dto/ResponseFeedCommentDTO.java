package com.example.Dietagram.dto;

import com.example.Dietagram.domain.FeedComment;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Builder
public class ResponseFeedCommentDTO {
    // FeedComment display
    private long id;
    private String nickname;
    private String content;


}
