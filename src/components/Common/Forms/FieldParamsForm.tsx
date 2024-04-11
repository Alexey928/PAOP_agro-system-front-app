import React, {useState} from 'react';
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {RegularEditableSpan} from "../../uiComponents/RgularEditinebalSpan/RegularEditableSpan";
import style from "./formsStyle.module.css"

interface FieldParamsFormType {
    name: string,
    sqere: string,

}
type fieldParamsFormType = {
    setFieldParams: ( name: string, squere: number)=>void
    name:string,
    sqere:string,
}
const FieldParamsForm:React.FC<fieldParamsFormType> = ({setFieldParams}) => {
    const[plaseholder,setPlaseholder] = useState({sqere:"Введите S ",name:"Введите название"})
    const {handleSubmit, control} = useForm<FieldParamsFormType>();
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
                       render={({field:{onChange}}) =>
                           <RegularEditableSpan
                               placeholder={plaseholder.sqere}
                               type={"number"}
                               onChange={(newValue)=>{
                                   onChange(newValue);
                                   setPlaseholder({...plaseholder,sqere: newValue ? newValue:"Введите площадь"})
                               }}
                           />}
                   />
               </span>
                  <br/>
                   <span>-
                      Название / Абривиотура{' '}
                       <Controller
                           rules={{required:"Введите Название"}}
                           name="name"
                           control={control}
                           render={({field:{onChange}}) =>
                               <RegularEditableSpan
                                   placeholder={plaseholder.name}
                                   lang={"ru"}
                                   type={"text"}
                                   onChange={(newValue)=>{
                                       onChange(newValue);
                                       setPlaseholder({...plaseholder,name: newValue ? newValue:"Введите название"})
                                   }}
                               />
                            }
                       />
                    </span>
           </span>
            <button className={style.formButton} type={"submit"}>OK</button>
        </form>

    );
};

export default FieldParamsForm;