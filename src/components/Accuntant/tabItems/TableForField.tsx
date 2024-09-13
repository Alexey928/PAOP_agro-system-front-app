import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useMediaQuery} from "@mui/material";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,

) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('поле1', 159, 6.0, 24, 4.0,),
    createData('поле1', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

 function TableForField() {
     const matches = useMediaQuery('(min-width:700px)');

    return (
        <TableContainer color={"black"} style={{width:!matches?380:800,alignSelf:"flex-start"}} component={Paper}>
            <Table sx={{minWidth:650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Матеріал</TableCell>
                        <TableCell align="right">витрачено л/кг</TableCell>
                        <TableCell align="right">витрата (Грн.)</TableCell>
                        <TableCell align="right">дата</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row,i) => (
                        <TableRow
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableForField;