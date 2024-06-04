import React from 'react';
import {useAppDispatch, useAppSelector} from "../../BLL/Store";
import {selectTaskParamsPopupIsOpen} from "../../Utils/selectors";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {setTaskParamsPopupIsOpen} from "../../BLL/map-interfase-reduser";
import {BasicDateTimePicker} from "./SelectDateComponents/DateWidthTymePicer";
import { useForm,  SubmitHandler ,Controller} from "react-hook-form"


export enum TypesOfTask  {
    "SHOWING_CROPS",
    "SHOWING_CROPS_WIDTH_FERTILYZE",
}
interface IFormInputs{
    type:string,
    from:string
}
const TaskParamPopup = () => {
    const fieldPopupFlag = useAppSelector(selectTaskParamsPopupIsOpen);
    const dispatch = useAppDispatch();

    const { control, handleSubmit, formState, getValues} = useForm({
        defaultValues: {
            type: "",
            from:"",
        },
    })
    const onSubmit:SubmitHandler<IFormInputs> = () => {
        console.log(TypesOfTask[+getValues().type])
    }
    return (
        fieldPopupFlag ?
            <form  onSubmit={handleSubmit(onSubmit)}>
                <div className="popup">
                    <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
                        <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",}}>
                            <Controller control={control} name={"type"} rules={{ required:"Оберіть вашу роль!" }} render={({field})=>(
                                <FormControl>
                                    <InputLabel  id="demo-simple-select-label">Тип завданя</InputLabel>
                                    <Select
                                        label={"Тип завданя"}
                                        SelectDisplayProps={
                                            {style: {
                                                    color:'#01f6bd',
                                                    width:150,
                                                }
                                            }}
                                        value={field.value}
                                        color={"primary"}
                                        variant={"outlined"}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={field.onChange}
                                    >
                                        <MenuItem value={"0"} >Посів культури</MenuItem>
                                        <MenuItem value={"1"}>Посів із добривами</MenuItem>
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
                                </FormControl>
                            )} />

                            <Controller control={control} rules={{ required:"Вкажіть дату!" }} render={({field})=>(
                                <FormControl>
                                     <BasicDateTimePicker value={field.value} onChange={field.onChange}/>
                                </FormControl>
                            )} name={"from"}
                            />
                            {formState.isValid && <div>valid</div>}

                        </div>
                    </div>
                    <div>
                        <Button variant={"contained"}
                                color={"error"}
                                onClick={()=>{dispatch(setTaskParamsPopupIsOpen())}}> Вихід
                        </Button>
                        <Button type={"submit"}
                                variant={"contained"}
                                color={"primary"}
                                onClick={()=>{}}> OK
                        </Button>
                    </div>
                </div>
            </form>:
            <></>
        );
};

export default TaskParamPopup;