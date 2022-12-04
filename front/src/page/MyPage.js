import './MyPage.css';
import React, { useState } from 'react';
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
    const [open, setOpen] = React.useState(false);

    const handleTab = (event, newValue) => {
        setTab(newValue);
    };

    const saveInfo = () => {
        alert('저장 완료');
        handleClose();
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div id='MyPage'>
            <div id='myTop'>
                <span><b>닉네임</b></span>
                <MenuRoundedIcon fontSize='large'/>
            </div>
            <div id='MyFollow'>
                <Avatar sx={{ bgcolor: deepPurple[500], width: 80, height: 80, marginTop: 2, fontSize: 50 }} aria-label="profile">
                    이
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
                            <TextField label="새로운 닉네임" variant="outlined" sx={{width: '80%', marginBottom: 1}}/>
                        </ListItem>
                        <ListItem>
                            <TextField label="새로운 일일 목표 칼로리" variant="outlined" sx={{width: '80%', marginBottom: 1}}/>
                        </ListItem>
                        <ListItem>
                            <TextField label="새로운 키" variant="outlined" sx={{width: '80%', marginBottom: 1}}/>
                        </ListItem>
                        <ListItem>
                            <TextField label="새로운 몸무게" variant="outlined" sx={{width: '80%', marginBottom: 1}}/>
                        </ListItem>
                    </List>
                </Dialog>
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