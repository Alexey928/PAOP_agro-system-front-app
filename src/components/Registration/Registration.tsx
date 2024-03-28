import React from 'react';
import {Button, FormControl, Input, InputLabel, MenuItem, Paper, Select, SelectChangeEvent} from "@mui/material";
import { useForm,  SubmitHandler ,Controller} from "react-hook-form"
import style from "./LoginStyle.module.css"
import {NavLink} from "react-router-dom";

export enum ROOLS{
    "ADMIN",
    "GENERAL_AGRONOMIST",
    "SIMPLE_AGRONOMIST",
   "ACCOUNTANT",
}

interface IFormInputs {
 Name: string;
 Password: string;
 Email:string
 Rolls:number|string
}
const Registration = () => {
    const [age, setAge] = React.useState('');
    const { control, handleSubmit } = useForm({
        defaultValues: {
            Name: "",
            Password: "",
            Email:"",
            Rolls:""
        },
    })
    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        console.log(data)
    }
    // const handleChange = (event: SelectChangeEvent) => {
    //     setAge(event.target.value as string);
    // };
    console.log("Registration")
    return (
        <div className={style.container}>
            <div>Login Page</div><label><NavLink to={"/login"}>Login</NavLink></label>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Paper   variant={"outlined"} className={style.paper}>
                    <ul className={style.formlist}>
                        <Controller rules={{ required: true }} name={"Name"} control={control} render={(field)=>{
                            return(
                              <li>
                                <label>Name *</label>
                                <Input {...field.field} type={"text"} placeholder={"уведіть імья"} />
                            </li>)}}
                        />
                        <Controller rules={{ required: true,minLength:6}} name={"Password"} control={control} render={(field)=>(
                            <li>
                                <label >Password *</label>
                                <Input {...field.field} placeholder={"уведіть пороль"} type={"password"} />
                            </li>)}
                        />
                        <Controller rules={{ required: true }} name={"Email"} control={control} render={(field)=>(
                            <li>
                                <label>Email *</label>
                                <Input {...field.field} placeholder={"уведіть імайл"} type={"text"} />
                            </li>)}
                        />
                    </ul>
                    <Controller rules={{ required: true }} control={control} name={"Rolls"} render={(field)=>(
                        <FormControl style={{width:190}}>
                            <InputLabel id="demo-simple-select-label">Роль</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={field.field.value}
                                label="Роль"
                                onChange={field.field.onChange}
                            >
                                <MenuItem value={""}></MenuItem>
                                <MenuItem value={1}>Головний огроном</MenuItem>
                                <MenuItem value={2}>Рядовий огроном</MenuItem>
                                <MenuItem value={3}>Бугалтер</MenuItem>
                            </Select>
                        </FormControl>
                    )}/>
                    <div style={{marginTop:50}}>
                        <Button type={"submit"} variant={"contained"}>зарегеструвати</Button>
                    </div>

                </Paper>
            </form>
        </div>
    );
};
export default Registration;