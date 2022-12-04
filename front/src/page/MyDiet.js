import './MyDiet.css';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const rows = [
    ['01/01', 1159, '실패'],
    ['01/02', 1237, '성공'],
    ['01/03', 1262, '성공'],
    ['01/04', 1305, '실패'],
    ['01/05', 1356, '성공'],
];

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
                {rows.map((row) => (
                    <TableRow key={row[0]}>
                        <TableCell align="center">{row[0]}</TableCell>
                        <TableCell align="center">{row[1]}</TableCell>
                        <TableCell align="center">{row[2]}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
}

export default MyDiet;