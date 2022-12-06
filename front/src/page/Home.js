import './Home.css';
import Feed from './Feed';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home(props) {
    const [refresh, setRefresh] = useState(false);
    const [feedList, setFeedList] = useState([]);

    const getFeedList = () => {
        axios.get(`http://ec2-43-200-55-101.ap-northeast-2.compute.amazonaws.com:8080/feed/mainfeedlist`, {
            headers: {
                'token' : localStorage.getItem("token")
            }
        })
        .then(res => {
            setFeedList(res.data);
            console.log('followFeed', res.data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const refreshHome = () => {
        setRefresh(!refresh);
    }

    useEffect(() => {
        getFeedList();
    }, [refresh]);

    return (
        <div id='Home'>
            {   
                feedList.map(item => {
                    return <Feed key={item.id} feedData={item} refreshHome={refreshHome}/>;
                })
            }

            <div style={{display: 'none'}}>
                {refresh}
            </div>
        </div>
    );
}

export default Home;
