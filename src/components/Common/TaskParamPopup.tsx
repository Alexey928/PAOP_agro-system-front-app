import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../BLL/Store";
import {selectTaskParamsPopupIsOpen} from "../../Utils/selectors";
import {Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {setTaskParamsPopupIsOpen} from "../../BLL/map-interfase-reduser";
import {BasicDateTimePicker} from "./SelectDateComponents/DateWidthTymePicer";
import { useForm,  SubmitHandler ,Controller} from "react-hook-form"
import TaskMaterialSelector, {MaterialTaskType} from "./TaskMaterialSelector";


export enum TypesOfTask  {
    "SHOWING_CROPS",
    "SHOWING_CROPS_WIDTH_FERTILYZE",
    "SPRAYING",
    "SOIL_WORKS",
    "FERTILIZATION",
    "HARVEST",
    "WINDROWING_OF_PERENNIALS",
    "MOWING_PERENNIALS",
    "BALINING_OF_PERENNIALS",
    "TRANPORTING",
    "SEED TREATMENT",
}


interface IFormInputs{
    type:string,
    from:string,
    taskSquere:number
}

type TaskParamPopupPropsType = {
    currentFieldSqere:number
}


const TaskParamPopup:React.FC<TaskParamPopupPropsType> = ({currentFieldSqere}) => {
    const [materialTasksEntity, setMaterialTaskEntity] = useState<MaterialTaskType[]>([]);

    const fieldPopupFlag = useAppSelector(selectTaskParamsPopupIsOpen);
    const dispatch = useAppDispatch();

    const { control, handleSubmit, formState, getValues} = useForm({
        defaultValues: {
            type: "",
            from:"",
            taskSquere:currentFieldSqere

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
                        <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:15,marginTop:60,marginBottom:120}}>
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
                                        onChange={(event,)=>{field.onChange(event);setMaterialTaskEntity([])}}
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
                            <Controller name={"taskSquere"} control={control} rules={{ required:"Вкажіть!" }}
                                        render={({field})=>(
                                <FormControl>
                                    <TextField
                                        onChange={field.onChange}
                                        type={"number"}
                                        InputProps={{
                                            style: {backgroundColor: '#00051e' ,color:"white"},
                                            endAdornment: <InputAdornment color={"#01f6bd"} position="end"> {`ГА`} </InputAdornment>
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                color:'#01f6bd'
                                            }
                                        }}
                                        id="outlined-start-adornment"
                                        label="Площа завдання"
                                        variant="outlined"

                                    />
                                </FormControl>

                            )}/>

                            <Controller control={control} rules={{ required:"Вкажіть дату!" }} render={({field})=>(
                                <FormControl>
                                     <BasicDateTimePicker value={field.value} onChange={field.onChange}/>
                                </FormControl>
                            )} name={"from"}
                            />
                            {
                                formState.isValid &&
                                <div>
                                    <TaskMaterialSelector setTascMaterial={(taskMaterial)=>{}}
                                                                             currentFieldSqere={currentFieldSqere}
                                                                             taskType={TypesOfTask[+getValues().type]}/>
                                </div>
                            }

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

                </div>
            </form>:
            <></>
        );
};

export default TaskParamPopup;