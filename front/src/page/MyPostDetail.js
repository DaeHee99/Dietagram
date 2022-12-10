import './MyPost.css';
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Comment from './Comment';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MyPostDetail(props) {
    const [open, setOpen] = React.useState(false);
    const [nutrient] = React.useState([
        ['중량(g)', props.item.responseFeedImageDTO['weight_g']],
        ['에너지(kcal)', props.item.responseFeedImageDTO['calorie_kcal']],
        ['탄수화물(g)', props.item.responseFeedImageDTO['Carbohydrate_g']],
        ['당류(g)', props.item.responseFeedImageDTO['sugars_g']],
        ['지방(g)', props.item.responseFeedImageDTO['fat_g']],
        ['단백질(g)', props.item.responseFeedImageDTO['protein_g']],
        ['칼슘(mg)', props.item.responseFeedImageDTO['calcium_mg']],
        ['인(mg)', props.item.responseFeedImageDTO['phosphorus_mg']],
        ['나트륨(mg)', props.item.responseFeedImageDTO['sodium_mg']],
        ['칼륨(mg)', props.item.responseFeedImageDTO['potassium_mg']],
        ['마그네슘(mg)', props.item.responseFeedImageDTO['magnesium_mg']],
        ['철(mg)', props.item.responseFeedImageDTO['iron_mg']],
        ['아연(mg)', props.item.responseFeedImageDTO['zinc_mg']],
        ['콜레스테롤(mg)', props.item.responseFeedImageDTO['cholesterol_mg']],
        ['트랜스지방(g)', props.item.responseFeedImageDTO['transFat_g']]
    ]);
    const [comment, setComment] = useState('');
    const [openCommentDeleteOK, setOpenCommentDeleteOK] = React.useState(false);
    const [openCommentDeleteNO, setOpenCommentDeleteNO] = React.useState(false);
    const [openComment, setOpenComment] = React.useState(false);
    const [feedDate, setDate] = React.useState(new Date(props.item.createdDate));


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
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

    const handleClickComment = () => {
        setOpenComment(true);
    };

    const handleCloseComment = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenComment(false);
    };

    const commentHandler = (event) => {
        setComment(event.target.value);
    }

    const uploadComment = () => {
        axios.post(`http://ec2-43-200-55-101.ap-northeast-2.compute.amazonaws.com:8080/feed/${props.item.id}/comment`, {comment: comment}, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'token' : localStorage.getItem("token")
        }
        })
        .then(function (response) {
            handleClickComment();
            props.refreshMyPage();
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(() => {
            setComment('');
        })
    }

    const handleDelete = (event) => {
        axios.delete(`http://ec2-43-200-55-101.ap-northeast-2.compute.amazonaws.com:8080/feed/${event.target.id}`, {
            headers: {
                'token' : localStorage.getItem("token")
            }
        })
        .then(response => {
            alert('삭제 완료');
            props.refreshMyPage();
            setOpen(false);
        }).catch(error => {
            console.log(error);
        });
    };

    React.useEffect(() => {
        let date = new Date(props.item.createdDate);
        date.setHours(date.getHours() + 9);
        setDate(date);
    }, [props.item.createdDate])

    return (
        <div key={props.item.id} className='post'>
            <button onClick={handleClickOpen} style={{width: '100%', height: '100%'}}>
                <img src={props.item.responseFeedImageDTO.imageUrl} style={{width: '100%', height: '100%'}} alt='My Feed'></img>
            </button>
            <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle><b>{props.item.responseFeedImageDTO.name}</b></DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <span style={{width: '100%', textAlign: 'center', display: 'block'}}>
                        <img style={{width: '70%'}} src={props.item.responseFeedImageDTO.imageUrl} alt='Feed Detail'></img>
                    </span>
                    <span style={{width: '100%', textAlign: 'center', display: 'block'}}>
                        {props.item.content}<br /><br />
                        <b>{`작성 시간 : ${feedDate.toLocaleString()}`}</b><br /><hr />

                        <CardContent sx={{width: '70%', margin: '0 auto'}}>
                        {
                            props.item.responseFeedCommentDTOList.map(item => {
                                return(
                                    <Comment key={item.id} item={item} refreshHome={props.refreshMyPage} commentDeleteOK={handleClickCommentDeleteOK} commentDeleteNO={handleClickCommentDeleteNO}/>
                                );
                            })
                        }
                        </ CardContent>
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
                        
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 300 }} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>항목</StyledTableCell>
                                <StyledTableCell align="center">값</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {nutrient.map((row) => {
                                return (
                                    <StyledTableRow key={row[0]}>
                                    <StyledTableCell component="th" scope="row">
                                        {row[0]}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row[1] || "0.0"}</StyledTableCell>
                                    </StyledTableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        </TableContainer>

                    </span>
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
                <Button id={props.item.id} onClick={handleDelete}>삭제</Button>
                <Button onClick={handleClose}>닫기</Button>
            </DialogActions>
            </Dialog>
            <Snackbar open={openComment} autoHideDuration={6000} onClose={handleCloseComment}>
                <Alert onClose={handleCloseComment} severity="success" sx={{ width: '100%' }}>
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
        </div>
    );
}

export default MyPostDetail;