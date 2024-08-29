import React, {useState} from 'react';
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {Button, InputAdornment, TextField, useMediaQuery} from "@mui/material";
import {setFieldParamsPopupIsOpen} from "../../../BLL/map-interfase-reduser";
import {useAppDispatch, useAppSelector} from "../../../BLL/Store";
import {
    selectRequestProcesingStatus,
    selectSelectedFieldID,
    selectSelectedFieldTrajectory
} from "../../../Utils/selectors";
import {updateFieldTC} from "../../../BLL/map-filds-reduser";
import FieldDemonstrateAndEdition from "../viueForDemoOrEditField/fieldDemonstrateAndEdition";
import {isEquleTrajectory} from "../../../Utils/parseTrajectory";

interface FieldParamsFormType {
    name: string,
    sqere: string,
    color:string

}
type fieldParamsFormPropsType = {
    setFieldParams: ( name: string, squere: number,color:string)=>void
    name:string,
    sqere:string,
    color:string,
}
const FieldParamsForm:React.FC<fieldParamsFormPropsType> = ({setFieldParams,name,sqere,color}) => {
    const matches = useMediaQuery('(min-width:900px)');
    const dispatch = useAppDispatch();
    const isRequestProcesing = useAppSelector(selectRequestProcesingStatus);
    const selectedID = useAppSelector(selectSelectedFieldID);
    const selectedTraiectory = useAppSelector(selectSelectedFieldTrajectory);

    const [currentTrajectoru, setCurrentTrajectory] = useState(selectedTraiectory);
    const [editTrajectory , setEditTrajectory] = useState(false)

    const {handleSubmit, control} = useForm<FieldParamsFormType>({
        defaultValues:{
            name:name?? "",
            sqere:sqere?? "",
            color: color ?? "#57fd02",
        }
    });

    console.log(currentTrajectoru,selectedTraiectory,isEquleTrajectory(currentTrajectoru,selectedTraiectory))
    const onSubmit: SubmitHandler<FieldParamsFormType> = (data) => {
    console.log(data, sqere);

    if(selectedID){
        if (name===data.name && sqere==data.sqere && isEquleTrajectory(currentTrajectoru,selectedTraiectory)){
            window.alert("У ваших діях нема сенсу, ви не змінили жодного параметру !")
            return
        }
        if(sqere == data.sqere && !isEquleTrajectory(currentTrajectoru,selectedTraiectory)){
            window.alert("У ваших діях нема сенсу, ви змінили ПЕРИМЕТР але не змінили ПЛОЩЮ !?")
            return
        }
        if (sqere != data.sqere && isEquleTrajectory(currentTrajectoru,selectedTraiectory)){
            window.alert("У ваших діях нема сенсу, ви змінили ПЛОЩЮ але не змінили ПЕРИМЕТР !?")
            return
        }
        sqere === data.sqere && isEquleTrajectory(currentTrajectoru,selectedTraiectory) ?
            dispatch(updateFieldTC({fieldID:selectedID,name:data.name,description:"temp des",color:data.color})):
            dispatch(updateFieldTC({fieldID:selectedID,
                name:data.name,description:"temp des",color:data.color,
                trajectory:currentTrajectoru,sqere:data.sqere}
            ))
    }else{setFieldParams(data.name, +data.sqere, data.color);}
    setTimeout(() => dispatch(setFieldParamsPopupIsOpen()),300)
    }
    const exitButtonHandler = ()=> {
        const confirm = window.confirm("Ви певні що бажаєте вийти ?")
       if (!confirm) return
        dispatch(setFieldParamsPopupIsOpen());
    }
    const setNewTrajectory = (trajectory:number[][])=>{
        setCurrentTrajectory(trajectory);
        setEditTrajectory(!editTrajectory);
    }

    return (
        <form style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}} onSubmit={handleSubmit(onSubmit)}
              action="">
            {selectedID ? <div>Оновити поле</div>:<div>Створити поле</div>}

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
                                    InputProps={{
                                        style: {backgroundColor: '#00051e' ,color:"white"},
                                    }}
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
                               id="outlined-start-adornment"
                               label="ПЛОЩА"
                               variant="outlined"
                               InputProps={{
                                   style: {backgroundColor: '#00051e' ,color:"white"},
                                   endAdornment: <InputAdornment position="end"> Га </InputAdornment>
                               }}
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
                <div style={{marginTop:50,maxWidth:500,maxHeight:300}}>
                    {!editTrajectory ? <Controller
                        name="color"
                        control={control}
                        rules={{required:"Уведыть назву"}}
                        render={({field,fieldState})=>(
                            <TextField
                                         style={{width:150}}
                                         disabled={!!selectedID}
                                         variant={"outlined"}
                                         label={"КОЛЯР"}
                                         type={"color"}
                                         InputProps={{ style: {backgroundColor: '#00051e' ,color:"white",}}}
                                         InputLabelProps={{
                                             style: {
                                                 color:!fieldState.error?'#01f6bd':"red",
                                             }
                                         }}
                                        {...field}
                            />
                        )}
                    /> : <FieldDemonstrateAndEdition setNewTrajectory={setNewTrajectory}/>}
                </div>
                <br/>
                <br/>
                <br/>
            <div>
                <Button disabled={isRequestProcesing} variant={"contained"}  type={"submit"}
                        style={{marginRight:20}} >ЗБЕРЕГТИ</Button>
                <Button disabled={isRequestProcesing} variant={"contained"}  color={"error"}
                        onClick={exitButtonHandler}>ВИХІД</Button>
                {selectedID && <Button style={{margin:20}}
                                       disabled={isRequestProcesing || editTrajectory} variant={"contained"}
                                       color={isEquleTrajectory(currentTrajectoru,selectedTraiectory)?"success":"secondary"}
                                       onClick={()=>{setEditTrajectory(!editTrajectory)}}>ЗМІНИТИ ПЕРИМЕТР</Button>}
            </div>

        </form>

    );
};

export default FieldParamsForm;