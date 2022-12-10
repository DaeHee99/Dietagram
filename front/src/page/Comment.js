import './Feed.css';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { deepPurple } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function Comment(props) {
    const deleteComment = () => {
        if(props.item.nickname === localStorage.getItem("nickname")) {
            axios.delete(`http://ec2-43-200-55-101.ap-northeast-2.compute.amazonaws.com:8080/feed/${props.item.id}/comment`, {
                headers: {
                    'token' : localStorage.getItem("token")
                }
            })
            .then(response => {
                props.commentDeleteOK();
                props.refreshHome();
            }).catch(error => {
                console.log(error);
            });
        }
        else {
            props.commentDeleteNO();
        }
    }

    return (
        <CardHeader
            avatar={
            <Avatar sx={{ bgcolor: deepPurple[500] }} aria-label="recipe">
                {props.item.nickname[0]}
            </Avatar>
            }
            action={
            <IconButton aria-label="settings" onClick={deleteComment}>
                <DeleteIcon />
            </IconButton>
            }
            title={props.item.nickname}
            subheader={props.item.content}
        />
    );
}

export default Comment;