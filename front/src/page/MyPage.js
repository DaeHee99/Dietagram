import './MyPage.css';
import { useState } from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MyPost from './MyPost';
import MyDiet from './MyDiet';

function MyPage(props) {
    const [tab, setTab] = useState(0);

    const handleTab = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <div id='MyPage'>
            <div id='myTop'>
                <span><b>닉네임</b></span>
                <MenuRoundedIcon fontSize='large'/>
            </div>
            <div id='MyFollow'>
                <Avatar sx={{ bgcolor: deepPurple[500], width: 80, height: 80, marginTop: 2, fontSize: 50 }} aria-label="profile">
                    R
                </Avatar>
                <div className='MyPage_follow'>
                    <b>15</b><br />
                    Post
                </div>
                <div className='MyPage_follow'>
                    <b>11</b><br />
                    Followers
                </div>
                <div className='MyPage_follow'>
                    <b>3</b><br />
                    Following
                </div>
            </div>
            <div id='profile_desc'>
                안녕하세요. 소프트웨어공학 7조입니다.
            </div>
            <div id='edit'>
                <Button variant="outlined" sx={{width: '100%'}}>프로필 수정</Button>
            </div>
            <Box sx={{ width: '100%', bgcolor: 'background.paper', marginBottom: 1 }}>
            <Tabs value={tab} onChange={handleTab} centered>
                <Tab label="내 포스트" sx={{width: '50%'}}/>
                <Tab label="식단 기록 분석 결과" sx={{width: '50%'}} />
            </Tabs>
            </Box>
            {tab === 0 ? 
                <MyPost /> : 
                <MyDiet />
            }
        </div>
    );
}

export default MyPage;