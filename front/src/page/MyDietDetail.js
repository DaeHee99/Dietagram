import { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

function MyDietDetail(props) {
    const [dietDate, setDietDate] = useState(new Date(props.data.date));

    useEffect(() => {
        let date = new Date(props.data.date);
        date.setHours(date.getHours() + 9);
        setDietDate(date);
    }, [props.data.date])

    return (
        <TableRow key={props.data.date}>
            <TableCell align="center">{dietDate.toDateString()}</TableCell>
            <TableCell align="center">{props.data.calorieSum}</TableCell>
            <TableCell align="center">{props.data.calorieSum > props.calorie_goal ? "초과" : (props.data.calorieSum < props.calorie_goal ? "미달" : "성공")}</TableCell>
        </TableRow>
    );
}

export default MyDietDetail;