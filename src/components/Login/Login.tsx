import React from 'react';
import {Alert, Button, Input,  Paper} from "@mui/material";
import { useForm,  SubmitHandler ,Controller} from "react-hook-form"
import style from "../Registration/LoginStyle.module.css"
import {NavLink} from "react-router-dom";


interface IFormInputs {
    Name: string;
    Password: string;

}



const Login = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            Name: "",
            Password: "",

        },
    })
    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        console.log(data)
    }
    return (
        <div className={style.container}>
            <div>Login Page</div><label><NavLink to={"/login"}>Login</NavLink></label>
            <Alert style={{position:"absolute"}} variant="filled" severity="error">This is an error Alert.</Alert>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Paper   variant={"outlined"} className={style.paper}>
                    <ul className={style.formlist}>
                        <Controller rules={{ required: "уведіть імья" }} name={"Name"} control={control} render={(field)=>{
                            console.log(field)
                            return(
                                <li>
                                    <label style={{color:field.fieldState.error?"red":"black"}}>Name *</label>
                                    <Input {...field.field}  type={"text"} placeholder={"уведіть імья"} />
                                </li>)}}
                        />
                        <Controller rules={{ required:"",minLength:6}} name={"Password"} control={control} render={(field)=>{
                            console.log(field)
                            return(
                                <li>
                                    <label >Password *</label>
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