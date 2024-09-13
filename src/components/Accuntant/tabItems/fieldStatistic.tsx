import React from 'react';
import {useMediaQuery} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

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
    createData('девятий вал', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 159, 9.0, 37, 4.3),
    createData('Eclair', 159, 16.0, 24, 6.0),
    createData('Cupcake', 159, 3.7, 67, 4.3),
    createData('Gingerbread', 159, 16.0, 49, 3.9),
];

const FieldStatistic = () => {
    const matches = useMediaQuery('(min-width:700px)');
    return (
        <TableContainer style={{width:!matches?380:800}} component={Paper}>
            <Table sx={{minWidth:650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Назвва Матеріалу</TableCell>
                        <TableCell align="right">Вартість</TableCell>
                        <TableCell align="right">витрата (Т)</TableCell>
                        <TableCell align="right">Витрата($)</TableCell>
                        <TableCell align="right">Оброблена площа</TableCell>
                        <TableCell align="right">Назва поля</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
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

};

export default FieldStatistic;