import './MyDiet.css';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function MyDiet(props) {
    return (
        <div id='MyDiet'>
            <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">날짜</TableCell>
                    <TableCell align="center">총 에너지(kcal)</TableCell>
                    <TableCell align="center">목표 달성</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {props.data.map((item) => (
                    <TableRow key={item.date}>
                        <TableCell align="center">{item.date.slice(0,10)}</TableCell>
                        <TableCell align="center">{item.calorieSum}</TableCell>
                        <TableCell align="center">{item.calorieSum > props.calorie_goal ? "초과" : (item.calorieSum < props.calorie_goal ? "미달" : "성공")}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
}

export default MyDiet;