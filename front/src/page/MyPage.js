import './MyPage.css';
import React, { useEffect, useState } from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MyPost from './MyPost';
import MyDiet from './MyDiet';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MyPage(props) {
    const [tab, setTab] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [newName, setNewName] = useState('');
    const [newCalorie, setNewCalorie] = useState('');
    const [newHeight, setNewHeight] = useState('');
    const [newWeight, setNewWeight] = useState('');
    const [dailyData, setDailyData] = useState([]);
    const [userData, setUserData] = useState({
        "id": 0,
        "attributeId": "",
        "nickname": "",
        "calorie_goal": 0,
        "token": "",
        "weight": 0,
        "height": 0,
        "responseFeedDTO": [],
        "followingList": [],
        "followerList": []
    });

    const handleTab = (event, newValue) => {
        setTab(newValue);
    };

    const saveInfo = () => {        
        axios.post('http://ec2-43-200-55-101.ap-northeast-2.compute.amazonaws.com:8080/mypage/edit', {
            "originName" : localStorage.getItem("nickname"),
            "newName" : newName,
            "weight" : newWeight,
            "height" : newHeight,
            "calorie_goal" : newCalorie
        }, {
        headers: {
            'Content-Type': 'application/json',
            'token' : localStorage.getItem("token")
        }
        })
        .then(function (response) {
            console.log(response);
            alert('저장 완료');
        })
        .catch(function (error) {
            console.log(error);
            alert('실패');
        })
        .then(() => {
            setNewName('');
            setNewCalorie('');
            setNewHeight('');
            setNewWeight('');
            handleClose();
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setNewName('');
        setNewCalorie('');
        setNewHeight('');
        setNewWeight('');
        setOpen(false);
    };

    const changeName = (event) => {
        setNewName(event.target.value);
    }

    const changeCalorie = (event) => {
        setNewCalorie(event.target.value);
    }

    const changeHeight = (event) => {
        setNewHeight(event.target.value);
    }

    const changeWeight = (event) => {
        setNewWeight(event.target.value);
    }

    const refreshMyPage = () => {
        setRefresh(!refresh);
    }

    useEffect(() => {
        axios.get("http://ec2-43-200-55-101.ap-northeast-2.compute.amazonaws.com:8080/mypage", {
            headers: {
                'token' : localStorage.getItem("token")
            }
        })
        .then(response => {
            console.log(response);
            setUserData(response.data);
        }).catch(error => {
            console.log(error);
        });

        // 일일 식단 분석 결과 데이터 가져오기
        axios.get("http://ec2-43-200-55-101.ap-northeast-2.compute.amazonaws.com:8080/mypage/calorie", {
            headers: {
                'token' : localStorage.getItem("token")
            }
        })
        .then(response => {
            console.log(response);
            setDailyData(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, [refresh]);

    return (
        <div id='MyPage'>
            <div id='myTop'>
                <span><b>{userData.nickname}</b></span>
                <MenuRoundedIcon fontSize='large'/>
            </div>
            <div id='MyFollow'>
                <Avatar sx={{ bgcolor: deepPurple[500], width: 80, height: 80, marginTop: 2, fontSize: 50 }} aria-label="profile">
                    {userData.nickname[0]}
                </Avatar>
                <div className='MyPage_follow'>
                    <b>{userData.responseFeedDTO.length}</b><br />
                    Post
                </div>
                <div className='MyPage_follow'>
                    <b>{userData.followerList.length}</b><br />
                    Followers
                </div>
                <div className='MyPage_follow'>
                    <b>{userData.followingList.length}</b><br />
                    Following
                </div>
            </div>
            <div id='profile_desc'>
                안녕하세요. 저는 "{userData.nickname}" 입니다. <br />
                제 일일 목표 칼로리는 {userData.calorie_goal}Kcal 입니다. <br /><br />
                {`현재 신체 정보 - [키 : ${userData.height | '등록 안됨'} // 몸무게 : ${userData.weight | '등록 안됨'}]`}
            </div>
            
            <div id='edit'>
                <Button variant="outlined" onClick={handleClickOpen} sx={{width: '100%'}}>프로필 수정</Button>
                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        >
                        <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        정보 수정
                        </Typography>
                        <Button autoFocus color="inherit" onClick={saveInfo}>
                        저장
                        </Button>
                    </Toolbar>
                    </AppBar>
                    <List sx={{width: '70%', margin: '30px auto'}}>
                        <ListItem>
                            <TextField label="새로운 닉네임" value={newName} onChange={changeName} variant="outlined" sx={{width: '80%', marginBottom: 1}}/>
                        </ListItem>
                        <ListItem>
                            <TextField label="새로운 일일 목표 칼로리" value={newCalorie} onChange={changeCalorie} variant="outlined" sx={{width: '80%', marginBottom: 1}}/>
                        </ListItem>
                        <ListItem>
                            <TextField label="새로운 키" value={newHeight} onChange={changeHeight} variant="outlined" sx={{width: '80%', marginBottom: 1}}/>
                        </ListItem>
                        <ListItem>
                            <TextField label="새로운 몸무게" value={newWeight} onChange={changeWeight} variant="outlined" sx={{width: '80%', marginBottom: 1}}/>
                        </ListItem>
                    </List>
                </Dialog>
            </div>
            <div style={{display: 'none'}}>
                {refresh}
            </div>
            
            <Box sx={{ width: '100%', bgcolor: 'background.paper', marginBottom: 1 }}>
            <Tabs value={tab} onChange={handleTab} centered>
                <Tab label="내 포스트" sx={{width: '50%'}}/>
                <Tab label="식단 기록 분석 결과" sx={{width: '50%'}} />
            </Tabs>
            </Box>
            {tab === 0 ? 
                <MyPost data={userData.responseFeedDTO} refreshMyPage={refreshMyPage}/> : 
                <MyDiet data={dailyData} calorie_goal={userData.calorie_goal}/>
            }
        </div>
    );
}

export default MyPage;