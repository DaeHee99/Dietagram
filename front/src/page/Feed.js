import './Feed.css';
import React, { useState } from 'react';
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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Comment from './Comment';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const [comment, setComment] = useState('');
  const [open, setOpen] = React.useState(false);
  const [openCommentDeleteOK, setOpenCommentDeleteOK] = React.useState(false);
  const [openCommentDeleteNO, setOpenCommentDeleteNO] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClickCommentDeleteOK = () => {
    setOpenCommentDeleteOK(true);
  };

  const handleCloseCommentDeleteOK = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenCommentDeleteOK(false);
  };

  const handleClickCommentDeleteNO = () => {
    setOpenCommentDeleteNO(true);
  };

  const handleCloseCommentDeleteNO = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenCommentDeleteNO(false);
  };

  const commentHandler = (event) => {
    setComment(event.target.value);
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const favoriteClick = () => {
    setFavorite(!favorite);
  }

  const uploadComment = () => {
    axios.post(`http://ec2-43-200-55-101.ap-northeast-2.compute.amazonaws.com:8080/feed/${props.feedData.id}/comment`, {comment: comment}, {
      headers: {
          'Content-Type': 'multipart/form-data',
          'token' : localStorage.getItem("token")
      }
    })
    .then(function (response) {
      handleClick();
      props.refreshHome();
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(() => {
      setComment('');
    })
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
          {
            props.feedData.responseFeedCommentDTOList.map(item => {
              return(
                <Comment key={item.id} item={item} refreshHome={props.refreshHome} commentDeleteOK={handleClickCommentDeleteOK} commentDeleteNO={handleClickCommentDeleteNO}/>
              );
            })
          }
        </CardContent>
        <div style={{width: "95%", margin: "0 auto", marginBottom: "20px",display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
          <Avatar sx={{ bgcolor: deepPurple[500], margin: "auto 0" }} aria-label="recipe">
            {localStorage.getItem("nickname")[0]}
          </Avatar>
          <TextField
            id="outlined-multiline-flexible"
            label="댓글작성"
            multiline
            maxRows={4}
            value={comment}
            onChange={commentHandler}
            style={{width: "60%"}}
          />
          <Button variant="contained" onClick={uploadComment}>등록</Button>
        </div>
      </Collapse>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          댓글 작성 성공!
        </Alert>
      </Snackbar>
      <Snackbar open={openCommentDeleteOK} autoHideDuration={6000} onClose={handleCloseCommentDeleteOK}>
        <Alert onClose={handleCloseCommentDeleteOK} severity="success" sx={{ width: '100%' }}>
          댓글 삭제 완료!
        </Alert>
      </Snackbar>
      <Snackbar open={openCommentDeleteNO} autoHideDuration={6000} onClose={handleCloseCommentDeleteNO}>
        <Alert onClose={handleCloseCommentDeleteNO} severity="error" sx={{ width: '100%' }}>
          댓글 삭제 실패.. 본인의 댓글만 삭제할 수 있습니다.
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default Feed;