import React from 'react';
import {useAppDispatch, useAppSelector} from "../../BLL/Store";
import {selectTaskParamsPopupIsOpen} from "../../Utils/selectors";
import {Button, InputLabel, MenuItem, Select} from "@mui/material";
import {setTaskParamsPopupIsOpen} from "../../BLL/map-interfase-reduser";
import {useForm} from "react-hook-form";



enum TypesOfTask  {
    "SHOWING_CROPS",
    "SHOWING_CROPS_WIDTH_FERTILYZE",




}

const TaskParamPopup = () => {
    const fieldPopupFlag = useAppSelector(selectTaskParamsPopupIsOpen);
    const dispatch = useAppDispatch();

    const { control, handleSubmit, formState} = useForm({
        defaultValues: {
            type: "",
            materials: "",
            from:Date,
            Rolls:""
        },
    })

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
                            <MenuItem value={"0"}></MenuItem>
                            <MenuItem value={"1"}>Посів культури</MenuItem>
                            <MenuItem value={"8"}>Посів із добривами</MenuItem>
                            <MenuItem value={"2"}>Оприскування</MenuItem>
                            <MenuItem value={"3"}>Обробіток грунту</MenuItem>
                            <MenuItem value={"4"}>Внесення Добрив</MenuItem>
                            <MenuItem value={"5"}>Збирання врожаю</MenuItem>
                            <MenuItem value={"6"}>Валкування</MenuItem>
                            <MenuItem value={"7"}>Покос Багаторічника</MenuItem>
                            <MenuItem value={"8"}>Тюкування</MenuItem>
                            <MenuItem value={"9"}>Транспортування</MenuItem>
                            <MenuItem value={"10"}>Протровка семян</MenuItem>

                    </Select>

                </div>
            <Button variant={"contained"}
                    style={{marginTop:500,backgroundColor:"red"}}
                    onClick={()=>{dispatch(setTaskParamsPopupIsOpen())}}> Вихід
            </Button>

            </div>:
            <></>
    );
};

export default TaskParamPopup;