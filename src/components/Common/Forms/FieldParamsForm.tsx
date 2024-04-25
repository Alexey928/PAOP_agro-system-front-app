import React, {useState} from 'react';
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {Button,  TextField, useMediaQuery} from "@mui/material";
import {setFieldParamsPopupIsOpen} from "../../../BLL/map-interfase-reduser";
import {useAppDispatch} from "../../../BLL/Store";

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

    const matches = useMediaQuery('(min-width:900px)');
    const dispatch = useAppDispatch();

    const {handleSubmit, control} = useForm<FieldParamsFormType>({
        defaultValues:{
            name:"",
            sqere:""
        }
    });
    const onSubmit: SubmitHandler<FieldParamsFormType> = (data) => {
        console.log(data);
        setFieldParams(data.name, +data.sqere);
        setTimeout(()=>dispatch(setFieldParamsPopupIsOpen()),500)
    };
    const deleteButtonHandler = ()=> {
        const confirm = window.confirm("Ви певні що бажаєте видплити поле та усі його зміни")
       if (!confirm) return
        dispatch(setFieldParamsPopupIsOpen())
    }
    return (
        <form style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}} onSubmit={handleSubmit(onSubmit)}
              action="">
                <div style={{marginTop:50,width:matches?"25vw":"60" +
                        "vw"}}>
                   <Controller
                       name="name"
                       control={control}
                       rules={{required:"Уведыть назву",minLength:3}}
                       render={({field,fieldState}) => (
                           <TextField
                                    fullWidth
                                    color={"secondary"}
                                    id="outlined-basic"
                                    label="НАЗВА"
                                    variant="outlined"
                                    InputProps={{ style: {backgroundColor: '#00051e' ,color:"white",}}}
                                    InputLabelProps={{
                                        style: {
                                            color:!fieldState.error?'#01f6bd':"red",
                                        }}}
                                    {...field} />)
                       }
                   />
               </div>
                <div style={{marginTop:50,maxWidth:500}}>
                   <Controller
                       rules={{required:"уведыть площю"}}
                       name="sqere"
                       control={control}
                       render={({field,fieldState}) =>(
                           <TextField
                               id="outlined-basic"
                               label="ПЛОЩА"
                               variant="outlined"
                               InputProps={{ style: {backgroundColor: '#00051e' ,color:"white",}}}
                               InputLabelProps={{
                                   style: {
                                       color:!fieldState.error?'#01f6bd':"red",
                                   }
                               }}

                               type={"number"}
                               {...field}
                           />)}
                   />
                </div>
                <br/>
                <br/>
                <br/>
            <div>
                <Button variant={"contained"}  type={"submit"} style={{marginRight:20}} >ЗБЕРЕГТИ</Button>
                <Button variant={"contained"}  color={"error"} onClick={deleteButtonHandler}>ВИДАЛИТИ</Button>
            </div>

        </form>

    );
};

export default FieldParamsForm;