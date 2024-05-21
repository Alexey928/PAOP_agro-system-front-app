import React from 'react';
import {useAppSelector} from "../../BLL/Store";
import {selectTaskParamsPopupIsOpen} from "../../Utils/selectors";
import { InputLabel, MenuItem, Select} from "@mui/material";


const TaskParamPopup = () => {
    const fieldPopupFlag = useAppSelector(selectTaskParamsPopupIsOpen);

    return (
        fieldPopupFlag ? <div className="popup">
                <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",}}>
                    <InputLabel id="demo-simple-select-label">Тип завданя</InputLabel>
                    <Select
                            SelectDisplayProps={
                                {style: {
                                        color:'#01f6bd',
                                        width:150
                                    }
                                }}
                            value={""}
                            color={"primary"}
                            variant={"outlined"}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={(e)=>{
                                console.log(e)}}
                        >
                            <MenuItem value={""}></MenuItem>
                            <MenuItem value={"1"}>Посів культури</MenuItem>
                            <MenuItem value={"2"}>Оприскування</MenuItem>
                            <MenuItem value={"3"}>Грунтові роботи</MenuItem>
                            <MenuItem value={"4"}>Внесення Добрив</MenuItem>
                            <MenuItem value={"5"}>Збирання врожаю</MenuItem>
                            <MenuItem value={"6"}>Валкування</MenuItem>
                            <MenuItem value={"7"}>Покос Багаторічника</MenuItem>
                        </Select>
                </div>
            </div>:
            <></>
    );
};

export default TaskParamPopup;