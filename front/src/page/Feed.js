import './Feed.css';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { deepPurple } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

function Feed(props) {
  const [expanded, setExpanded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const favoriteClick = () => {
    setFavorite(!favorite);
  }

  return (
    <Card className='Feed' sx={{ maxWidth: 500, marginTop: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: deepPurple[500] }} aria-label="recipe">
            {props.feedData.nickname[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${props.feedData.responseFeedImageDTO.name}`}
      />
      <CardMedia
        component="img"
        height="300"
        image={props.feedData.responseFeedImageDTO.imageUrl}
        alt="Paella dish"
      />
      <CardContent>
        <Typography id='like' variant="body2" color="text.secondary">
          <b>{props.feedData.content}</b><br/><br/>
          22/11/11 10:30:17
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={favoriteClick}>
          {favorite ? <FavoriteIcon /> : <FavoriteBorderRoundedIcon />}
        </IconButton>
        <IconButton aria-label="bookmark">
          <BookmarkIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: deepPurple[500] }} aria-label="recipe">
                    R
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title="이름"
                subheader="댓글1"
            />
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: deepPurple[500] }}>AB</Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title="이름"
                subheader="댓글2"
            />
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: deepPurple[500] }}>AB</Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title="이름"
                subheader="댓글3"
            />
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: deepPurple[500] }}>AB</Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title="이름"
                subheader="댓글4"
            />
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Feed;