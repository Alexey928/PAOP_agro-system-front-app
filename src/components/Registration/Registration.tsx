import React from 'react';
import {Alert, Button, FormControl, Input, InputLabel, MenuItem, Paper, Select, SelectChangeEvent} from "@mui/material";
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

    const { control, handleSubmit,formState } = useForm({
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

    console.log("Registration")
    let massege =""
    return (
        <div className={style.container}>
            <div>Login Page</div><label>
            <NavLink to={"/login"}>Login</NavLink></label>
            {formState.isValid ? null:
                <Alert style={{position:"absolute"}} variant="filled" severity="success">
                    Заповніть коректно!
                </Alert>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <Paper   variant={"outlined"} className={style.paper}>
                    <ul className={style.formlist}>
                        <Controller rules={{required: "уведіть імья"}} name={"Name"} control={control} render={(field)=>{
                            console.log(field.fieldState.error,formState)
                            //field.fieldState.error && setError("Name",field.fieldState.error)
                            return(
                            <li>
                                <label style={{color:field.fieldState.error?"red":"black"}}>Name *</label>
                                <Input {...field.field}  type={"text"} placeholder={"уведіть імья"} />
                            </li>)}}
                        />
                        <Controller
                            rules={{required:"Уведіть пароль",minLength:{value:6,message:"Не меньше 6 символів"}}}
                            name={"Password"} control={control}
                            render={(field)=>{
                            console.log(field.fieldState.error)
                                return(
                                <li>
                                    <label style={{color:field.fieldState.error?"red":"black"}}>Password *</label>
                                    <Input  {...field.field} placeholder={"уведіть пороль"} type={"password"} />
                                </li>)
                            }}
                        />
                        <Controller rules={{ required:"ведіть майл" }} name={"Email"} control={control} render={(field)=>(
                            <li>
                                <label style={{color:field.fieldState.error?"red":"black"}}>Email *</label>
                                <Input {...field.field} placeholder={"уведіть імайл"} type={"text"} />
                            </li>)}
                        />
                    </ul>
                    <Controller rules={{ required: true }} control={control} name={"Rolls"} render={(field)=>(
                        <FormControl style={{width:190}} error>
                            <InputLabel id="demo-simple-select-error-label">Роль</InputLabel>
                            <Select
                                labelId="demo-simple-select-error-label"
                                id="demo-simple-select-error"
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