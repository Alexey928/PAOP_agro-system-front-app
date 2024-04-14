import React, {useState} from 'react';
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import style from "./formsStyle.module.css"
import {TextField} from "@mui/material";

interface FieldParamsFormType {
    name: string,
    sqere: string,

}
type fieldParamsFormPropsType = {
    setFieldParams: ( name: string, squere: number)=>void
    name:string,
    sqere:string,
}
const FieldParamsForm:React.FC<fieldParamsFormPropsType> = ({setFieldParams}) => {
    const[plaseholder,setPlaseholder] = useState({sqere:"Введите S ",name:"Введите название"})
    const {handleSubmit, control} = useForm<FieldParamsFormType>({

    });
    const onSubmit: SubmitHandler<FieldParamsFormType> = (data) => {
        console.log(data);
        setFieldParams(data.name, +data.sqere);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}
              action="">
           <span>
               <span>
                   Площадь - Га{" "}
                   <Controller
                       name="sqere"
                       control={control}
                       render={({field}) => (
                           <TextField id="outlined-basic" label="Outlined" variant="outlined" {...field} />)
                       }
                   />
               </span>
                  <br/>
                   <span>-
                      Название / Абривиотура{' '}
                       <Controller
                           rules={{required:"Введите Название"}}
                           name="name"
                           control={control}
                           render={({field}) =>(
                               <TextField id="outlined-basic" label="Outlined" variant="outlined" {...field} />)}
                       />
                    </span>
           </span>
            <button className={style.formButton} type={"submit"}>OK</button>
        </form>

    );
};

export default FieldParamsForm;