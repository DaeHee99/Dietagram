import './SearchPage.css';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import plus_icon from '../images/plus_icon.png';

import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
// import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { deepPurple } from '@mui/material/colors';


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: '100%'
}));

function SearchPage(props) {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const inputHandler = (event) => {
    setSearch(event.target.value);
  };

  const searchGo = () => {
    let frm = new FormData();
    frm.append("keyword", search);
    axios.post('http://ec2-43-200-55-101.ap-northeast-2.compute.amazonaws.com:8080/user/search', frm, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'token' : 'oooooooooooooooo'
      }
    })
    .then(function (response) {
      setSearchResult(response.data);
      setSearch('');
    })
    .catch(function (error) {
      setSearch('');
    });
  }

  const follow_friend = (event) => {
    console.log(event.target.id);

    let frm = new FormData();
    frm.append("targetId", event.target.id);
    axios.post('http://ec2-43-200-55-101.ap-northeast-2.compute.amazonaws.com:8080/userpage/follow', frm, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'token' : localStorage.getItem("token")
      }
    })
    .then(function (response) {
      console.log(response.data);
      alert('팔로우 성공');
      setSearch('');
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(() => {
      setSearch('');
    });
  }
 
    return (
      <div id='Search'>
        <Paper
          id='searchBar'
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="친구를 검색하세요"
            inputProps={{ 'aria-label': '친구를 검색하세요' }}
            value={search}
            onChange={inputHandler}
          />
          <input type="text" style={{display: 'none'}}/> {/* 의미 없는 태그 - 엔터 새로고침 해결 */}
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={searchGo}>
            <SearchIcon />
          </IconButton>
        </Paper>
        
        <br />

        <div id='searchResult'>
          <h3>검색 결과</h3>
          <Demo>
            <List dense={false}>
              {
                searchResult.map(item => {
                  return (
                    <ListItem
                      key={item.nickname}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={follow_friend}>
                          <img src={plus_icon} alt='plus_icon' id={item.id}/>
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: deepPurple[500] }} aria-label="recipe">
                          {item.nickname[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.nickname}
                      />
                    </ListItem>
                  )
                })
              }
            </List>
          </Demo>
        </div>
      </div>
    );
}

export default SearchPage;
