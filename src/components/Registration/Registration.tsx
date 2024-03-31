import React from 'react';
    import {Alert, Button,
            FormControl, Input, InputLabel, MenuItem,
            Paper, Select
        } from "@mui/material";
import { useForm,  SubmitHandler ,Controller} from "react-hook-form"
import style from "./LoginStyle.module.css"
import AuthNav from "../Common/AuthNav";

export enum ROLS{
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
    const { control, handleSubmit, formState} = useForm({
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
    let massege:string|undefined = "";
    if(formState.errors["Rolls"]) massege = formState.errors["Rolls"]?.message;
    if(formState.errors["Name"]) massege = formState.errors["Name"]?.message;
    if(formState.errors["Password"]) massege = formState.errors["Password"]?.message;
    if(formState.errors["Email"]) massege = formState.errors["Email"]?.message;
    console.log("Registration")
    return (
        <div className={style.container}>
            <AuthNav derection={"/login"} linkText={"Login"} headerText={"Registration page"}></AuthNav>
            {!massege ? null:
                <Alert className={style.alert}
                       variant="filled"
                       severity="error">
                                    {massege}
                </Alert>
            }
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <Paper   variant={"outlined"} className={style.paper}>
                    <ul className={style.formlist}>
                        <Controller rules={{required: "уведіть імья"}} name={"Name"} control={control} render={(field)=>{
                            console.log(field.fieldState.error,formState)
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
                        <Controller rules={{ required:"ведіть майл" }} name={"Email"} control={control}
                                    render={(field)=>(
                            <li>
                                <label style={{color:field.fieldState.error?"red":"black"}}>Email *</label>
                                <Input {...field.field} placeholder={"уведіть імайл"} type={"email"} />
                            </li>)}
                        />
                    </ul>
                    <Controller rules={{ required:"Оберіть вашу роль !" }} control={control} name={"Rolls"}
                                render={(field)=>{
                                    console.log(field.fieldState.error)
                                    return(
                        <FormControl  style={{width:190}} error={!!field.fieldState.error}>
                            <InputLabel id="demo-simple-select-label">Роль</InputLabel>
                            <Select
                                color={"secondary"}
                                variant={"standard"}
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
                    )}}/>
                    <div style={{marginTop:50}}>
                        <Button type={"submit"} variant={"contained"}>зарегеструвати</Button>
                    </div>
                </Paper>
            </form>
        </div>
    );
};
export default Registration;