package com.example.Dietagram.service;

import com.example.Dietagram.domain.Feed;
import com.example.Dietagram.domain.FeedComment;
import com.example.Dietagram.domain.FeedImage;
import com.example.Dietagram.domain.User;
import com.example.Dietagram.dto.CalorieByDateDTO;
import com.example.Dietagram.dto.FoodImageDTO;
import com.example.Dietagram.dto.NutritionDTO;
import com.example.Dietagram.repository.FeedCommentRepository;
import com.example.Dietagram.repository.FeedImageRepository;
import com.example.Dietagram.repository.FeedRepository;
import com.example.Dietagram.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
public class FeedService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    FeedRepository feedRepository;

    @Autowired
    FeedImageRepository feedImageRepository;

    @Autowired
    FeedCommentRepository feedCommentRepository;

    @Autowired
    OAuthService oAuthService;


    @Autowired
    ImageService imageService;

    public Feed getFeed(String id){
        return feedRepository.findById(Long.parseLong(id)).orElseThrow();
    }

    public List<Feed> getAllFeeds(User user){
        List<Long> followingList = user.getFollowingList();
        List<Feed> allFeedList= new ArrayList<>();

        for(long i : followingList){
            User tempUser = userRepository.findById(i).orElseThrow();
            allFeedList.addAll(tempUser.getFeedList());
        }

        return allFeedList;
    }

    public FeedComment getFeedComment(String feedCommentId){
        return feedCommentRepository.findById(Long.parseLong(feedCommentId)).orElseThrow();
    }


    public Feed createFeed(MultipartFile foodImage, NutritionDTO nutritionDTO, User user, String content,
                           String localOrServer) throws IOException {

        Feed feed = new Feed();
        FoodImageDTO foodImageDTO = imageService.upload(foodImage,user.getId().toString(),localOrServer);
        // feed post, save,
        FeedImage feedImage = FeedImage.FromNutritionDTO(nutritionDTO);
        feedImage.setImageUrl(foodImageDTO.getUrl());
        feedImage.setImageName(foodImageDTO.getFilename());
        feedImageRepository.save(feedImage);

        feed.addFeedImage(feedImage);
        feed.addUser(user);
        feed.setContent(content);

        feedRepository.save(feed);
        return feed;
    }

    public void deleteFeed(Feed targetFeed, User user, String localOrServer){

        FeedImage feedImage = targetFeed.getFeedFeedImage();
        feedCommentRepository.deleteAll(targetFeed.getFeedCommentList());
        imageService.delete(feedImage.getImageName(), user.getId().toString(), localOrServer);
        feedRepository.delete(targetFeed);
        feedImageRepository.delete(feedImage);

    }

    public FeedComment createFeedComment(Feed targetFeed, User user, String content){
        FeedComment feedComment = new FeedComment();
        feedComment.setContent(content);
        feedComment.setNickname(user.getNickname());

        targetFeed.addFeedComment(feedComment);
        feedCommentRepository.save(feedComment);
        feedRepository.save(targetFeed);

        return feedComment;
    }

    public void deleteFeedComment(FeedComment feedComment){
        feedCommentRepository.delete(feedComment);
    }

    public List<CalorieByDateDTO> getAllCalorieByDate(User user){
        List<Feed> userFeedList =  user.getFeedList();
        List<CalorieByDateDTO> calorieByDateDTOList = new ArrayList<>();
        for(int i=0; i<userFeedList.size(); i++){
            Feed temp = userFeedList.get(i);
            if(i!=0){
                CalorieByDateDTO formerTemp = calorieByDateDTOList.get(i-1); // 리스트의 이전 값
                CalorieByDateDTO dto = CalorieByDateDTO.createDTO(temp); // 현재값
                int result = compareDay(formerTemp.date,dto.date); // 날짜 비교
                if(result==1){
                    formerTemp.calorieSum += dto.calorieSum;
//                    long formerCalorieSum = calorieByDateDTOList.get(i-1).getCalorieSum(); //+= dto.calorieSum;

                }
                else {
                    calorieByDateDTOList.add(dto);
                }
            }
            else {
                CalorieByDateDTO dto = CalorieByDateDTO.createDTO(temp);
                calorieByDateDTOList.add(dto);
            }
            //feed받아서 같은거끼리 묶느데
//            dto.setCalorieSum();
        }
        return calorieByDateDTOList;
    }

    public List<CalorieByDateDTO> getAllCalorieByMinute(User user){
        List<Feed> userFeedList =  user.getFeedList();
        List<CalorieByDateDTO> calorieByDateDTOList = new ArrayList<>();
        for(int i=0; i<userFeedList.size(); i++){
            Feed temp = userFeedList.get(i);
            if(i!=0){
                CalorieByDateDTO formerTemp = calorieByDateDTOList.get(calorieByDateDTOList.size()-1); // 리스트의 마지막 값

                CalorieByDateDTO dto = CalorieByDateDTO.createDTO(temp); // 현재값
                int result = compareMinute(formerTemp.date,dto.date); // 날짜 비교
                if(result==0){
                    formerTemp.calorieSum += dto.calorieSum;
//                    long formerCalorieSum = calorieByDateDTOList.get(i-1).getCalorieSum(); //+= dto.calorieSum;
                }
                else {
                    calorieByDateDTOList.add(dto);
                }
            }
            else {
                CalorieByDateDTO index0Dto = CalorieByDateDTO.createDTO(temp);
                calorieByDateDTOList.add(index0Dto);
            }
        }
        return calorieByDateDTOList;
    }




    public static int compareDay(LocalDateTime date1, LocalDateTime date2) {
        LocalDateTime dayDate1 = date1.truncatedTo(ChronoUnit.DAYS);
        LocalDateTime dayDate2 = date2.truncatedTo(ChronoUnit.DAYS);

        int compareResult = dayDate1.compareTo(dayDate2);

        System.out.println("=== 일 단위 비교 ===");
        System.out.println("date1.truncatedTo(ChronoUnit.DAYS) : " + dayDate1);
        System.out.println("date2.truncatedTo(ChronoUnit.DAYS) : " + dayDate2);
        System.out.println("결과 : " + compareResult);

        return compareResult;
    }

    public static int compareMinute(LocalDateTime date1, LocalDateTime date2) {
        LocalDateTime dayDate1 = date1.truncatedTo(ChronoUnit.MINUTES);
        LocalDateTime dayDate2 = date2.truncatedTo(ChronoUnit.MINUTES);

        int compareResult = dayDate1.compareTo(dayDate2);

        System.out.println("=== 분 단위 비교 ===");
        System.out.println("date1.truncatedTo(ChronoUnit.DAYS) : " + dayDate1);
        System.out.println("date2.truncatedTo(ChronoUnit.DAYS) : " + dayDate2);
        System.out.println("결과 : " + compareResult);

        return compareResult;
    }



}
