import './SearchPage.css';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function SearchPage(props) {
  const [search, setSearch] = useState('');

  const inputHandler = (event) => {
    setSearch(event.target.value);
  }

  const searchGo = () => {
    console.log(search);
    setSearch('');
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
        </div>
    );
}

export default SearchPage;