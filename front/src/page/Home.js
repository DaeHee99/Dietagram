import './Home.css';
import Feed from './Feed';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home(props) {
    const [feedList, setFeedList] = useState([]);

    const getFeedList = () => {
        axios.get(`http://ec2-43-200-55-101.ap-northeast-2.compute.amazonaws.com:8080/feed/mainfeedlist`, {
            headers: {
                'token' : localStorage.getItem("token")
            }
        })
        .then(res => {
            setFeedList(res.data);
        })
        .catch(error => {
            console.log(error);
        })
        .then(() => {
            console.log(feedList);
        })
    }
    
    useEffect(() => {
        getFeedList();
    }, []);

    return (
        <div id='Home'>
            {   
                //작성자 이름, 음식 사진, 피드 설명, 날짜, 댓글 리스트(작성자 이름, 댓글 내용)

                // feedList.map((item, i) => {
                //     return <Feed key={i} feedData={item}/>;
                // })

                [1,2,3,4,5].map((item, i) => {
                    return <Feed key={i} feedData={item}/>;
                })
            }
        </div>
    );
}

export default Home;
