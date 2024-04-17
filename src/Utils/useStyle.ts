import {makeStyles, Theme} from "@mui/material";

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black', // Цвет обводки
            },
            '&:hover fieldset': {
                borderColor: 'black', // Цвет обводки при наведении
            },
            '&.Mui-focused fieldset': {
                borderColor: 'black', // Цвет обводки при фокусе
            },
        },
        '& .MuiInputLabel-root': {
            color: 'black', // Цвет метки
        },
        '& .MuiInputBase-input': {
            color: 'white', // Цвет текста в поле ввода
        },
    },
}));