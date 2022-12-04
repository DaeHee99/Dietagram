// import './MyPost.css';

// function MyPost(props) {    
//     return (
//         <div id='MyPost'>
//             {props.data.map(item => {
//                 return (
//                     <div key={item.id} className='post'>
//                         <img src={item.responseFeedImageDTO.imageUrl} style={{width: '100%', height: '100%'}}></img>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

// export default MyPost;



import './MyPost.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MyPost(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (event) => {
        axios.delete(`http://ec2-43-200-55-101.ap-northeast-2.compute.amazonaws.com:8080/feed/${event.target.id}`, {
            headers: {
                'token' : localStorage.getItem("token")
            }
        })
        .then(response => {
            console.log(response);
            alert('삭제 완료');
            setOpen(false);
        }).catch(error => {
            console.log(error);
        });
        console.log(event.target.id);
    };
    
    return (
        <div id='MyPost'>
            {props.data.map(item => {
                return (
                    <div key={item.id} className='post'>
                        <button onClick={handleClickOpen} style={{width: '100%', height: '100%'}}>
                            <img src={item.responseFeedImageDTO.imageUrl} style={{width: '100%', height: '100%'}} alt='My Feed'></img>
                        </button>
                        <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                        >
                        <DialogTitle><b>{item.responseFeedImageDTO.name}</b></DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                <div style={{width: '100%', textAlign: 'center'}}>
                                    <img style={{width: '70%'}} src={item.responseFeedImageDTO.imageUrl} alt='Feed Detail'></img>
                                </div>
                                <div>
                                    {item.content}<br /><br />
                                    칼로리 : {item.responseFeedImageDTO.calorie_kcal}<br /><br />
                                    --댓글-- <br/>
                                    {item.responseFeedCommentDTOList.map(comment => {
                                        return (
                                            <div>
                                                댓글 댓글 {comment}
                                            </div>
                                        );
                                    })}
                                </div>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                            <Button id={item.id} onClick={handleDelete}>삭제</Button>
                            <Button onClick={handleClose}>닫기</Button>
                        </DialogActions>
                        </Dialog>
                    </div>
                );
            })}
        </div>
    );
}

export default MyPost;