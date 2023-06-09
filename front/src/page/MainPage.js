import './MainPage.css';
import Logo from '../images/logo.png';
import { useState, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NearMeIcon from '@mui/icons-material/NearMe';
import { deepPurple } from '@mui/material/colors';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '@mui/material/Paper';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import Avatar from '@mui/material/Avatar';

import Home from './Home';
import SearchPage from './SearchPage';
import Upload from './Upload';
import MyPage from './MyPage';


function MainPage(props) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

    return (
        <div className="MainPage">
            <Box sx={{ display: 'flex' }}>
                <AppBar component="nav">
                    <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <img id='mainLogo' src={Logo} alt='logo'/>
                    </Typography>
                    <Button color="inherit"><NearMeIcon /></Button>
                    </Toolbar>
                </AppBar>
            </Box>
            
            {value === 0 ? <Home/> :
            value === 1 ? <SearchPage/> :
            value === 2 ? <Upload /> : <MyPage /> 
            }

            <Box sx={{ pb: 7 }} ref={ref}>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    >
                    <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} />
                    <BottomNavigationAction label="Search" icon={<SearchRoundedIcon />} />
                    <BottomNavigationAction label="Upload" icon={<FileUploadRoundedIcon />} />
                    {/* <BottomNavigationAction label="Active" icon={<FavoriteIcon />} /> */}
                    <BottomNavigationAction icon={<Avatar sx={{ bgcolor: deepPurple[500] }} aria-label="profile">
                        {localStorage.getItem("nickname")[0]}
                    </Avatar>} />
                    </BottomNavigation>
                </Paper>
            </Box>
        </div>
    );

}

export default MainPage;
