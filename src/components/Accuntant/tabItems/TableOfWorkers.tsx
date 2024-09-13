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
    mashine: string,
    fat: string,
    carbs: number,
    protein: number,
) {
    return { name, calories: mashine, fat, carbs, protein };
}

export const rows = [
    createData('Ус В.А.', "Джон-Дір 8430", "120 (л)", 24, 4.0),
    createData('Малигін Е.К.', "КАМАЗ 8115АХ", "40(л)", 37, 4.3),
    createData('Слабинський М. І.', "Маниту 1245АХ", "50(л)", 24, 6.0),

];

export const TableOfWorkers = () => {
    const matches = useMediaQuery('(min-width:700px)');
    return (
        <TableContainer style={{width:!matches?380:800}} component={Paper}>
            <Table sx={{minWidth:650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Виконавець </TableCell>
                        <TableCell align="right">техніка</TableCell>
                        <TableCell align="right">Витрата палива</TableCell>
                        <TableCell align="right">Витрата годин</TableCell>
                        <TableCell align="right">Оброблена площа</TableCell>

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

