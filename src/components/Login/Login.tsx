import React from 'react';
import {Alert, Button, Input, Paper, } from "@mui/material";
import { useForm,  SubmitHandler ,Controller} from "react-hook-form"
import style from "../Registration/LoginStyle.module.css"
import AuthNav from "../Common/AuthNav";
import {loginTC} from "../../BLL/auth-reduser";
import {useAppDispatch} from "../../BLL/Store";



interface IFormInputs {
    Email: string;
    Password: string;
}

const Login = () => {
    const { control, handleSubmit,formState } = useForm({
        defaultValues: {
            Email: "",
            Password: "",
        },
    })
    const dispatch = useAppDispatch()

    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        console.log(data);
        dispatch(loginTC(data.Email,data.Password))
    }

    let massege:string|undefined = "";
    if(formState.errors["Password"]) massege = formState.errors["Password"]?.message;
    if(formState.errors["Email"]) massege = formState.errors["Email"]?.message;
    return (
        <div className={style.container}>
            <AuthNav derection={"/registration"} linkText={"registration"} headerText={"Login page"}></AuthNav>
            {massege && <Alert className={style.alert} variant="filled" severity="error">{massege}</Alert>}
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                <Paper   variant={"outlined"} className={style.paper}>
                    <ul className={style.formlist}>
                        <Controller rules={{required: "уведіть майл"}} name={"Email"} control={control} render={(field)=>{
                            console.log(field)
                            return(
                                <li>
                                    <label style={{color:field.fieldState.error?"red":"black"}}>Email *</label>
                                    <Input {...field.field}  type={"email"} placeholder={"уведіть імья"} />
                                </li>)}}
                        />
                        <Controller
                            rules={{ required:"уведіть пароль",minLength:{value:6,message:"не меньш 6 символів"}}}
                            name={"Password"} control={control} render={(field)=>{
                            console.log(field)
                            return(
                                <li>
                                    <label style={{color:field.fieldState.error?"red":"black"}}>Password *</label>
                                    <Input {...field.field} placeholder={"уведіть пороль"} type={"password"} />
                                </li>)}}
                        />
                    </ul>
                    <div style={{marginTop:50}}>
                        <Button type={"submit"} variant={"contained"}>увійти</Button>
                    </div>
                </Paper>
            </form>
        </div>
    );}
export default Login;