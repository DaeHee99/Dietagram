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
import CardHeader from '@mui/material/CardHeader';
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
            props.refreshMyPage();
            setOpen(false);
        }).catch(error => {
            console.log(error);
        });
        console.log(event.target.id);
    };


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

                        <CardContent sx={{width: '70%', margin: '0 auto'}}>
                            <CardHeader
                                avatar={
                                <Avatar sx={{ bgcolor: deepPurple[500] }} aria-label="recipe">
                                    이
                                </Avatar>
                                }
                                title="이름"
                                subheader="댓글댓글댓글1"
                            />
                        </ CardContent>
                        
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
        </div>
    );
}

export default MyPostDetail;