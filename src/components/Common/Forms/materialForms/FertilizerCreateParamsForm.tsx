import React from 'react';
import {CValueType, MaterialItemType} from "../../../../BLL/material-reducer";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";


interface IFormInputs{
    fertilizeName:string,
    fertilizeType:MaterialItemType,
    fertilizeSubType:string,// тип добрива органика хімія органична хімія
    fertilizeMetadata:string, // діючі речовини
    cValue:CValueType,
    consumptionRate:string,//"1-3" as sample
    basePrice:number,

}
export type FertilizerCreateParamsFormPropsType = {
    onExit:()=>void
}
const FertilizerCreateParamsForm:React.FC<FertilizerCreateParamsFormPropsType> = ({
    onExit
                                                                                  }) => {
    const { control, handleSubmit, formState, getValues,resetField} = useForm({
        defaultValues: {
            fertilizeName:"",
            fertilizeType:"хімія" as MaterialItemType,
            fertilizeSubType:"",
            fertilizeMetadata:"",
            cValue:"кг" as CValueType,
            consumptionRate:"",
            basePrice:0,
        },
    })
    const onSubmit:SubmitHandler<IFormInputs> = (data) => {
        const material = {
            name:data.fertilizeName.trim(),
            type:data.fertilizeType.trim(),
            subType:data.fertilizeSubType.trim(),
            metadata:data.fertilizeMetadata.trim(),
        }
        const alert = "";
        if(!material.type||!material.name||!material.subType||!material.metadata){
            window.alert("Водіть коректно, десь ввели самі пробели!")
            return
        }
        console.log(data,material);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
                <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:15,marginTop:60,marginBottom:120}}>

                    <Controller name={"fertilizeName"} control={control} rules={{ required:"Вкажіть!" }}
                                render={({field})=>(
                                    <FormControl>
                                        <TextField
                                            type={"text"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white"},

                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color:'#01f6bd'
                                                }
                                            }}
                                            id="outlined-start-adornment"
                                            label="Назва"
                                            variant="outlined"
                                            {...field}
                                        />
                                    </FormControl>
                                )}/>
                    <Controller name={"fertilizeSubType"} control={control} rules={{ required:"Вкажіть!" }}
                                render={({field})=>(
                                    <FormControl>
                                        <TextField
                                            type={"text"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white"},

                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color:'#01f6bd'
                                                }
                                            }}
                                            id="outlined-start-adornment"
                                            label="Тип добрив"
                                            variant="outlined"
                                            {...field}
                                        />
                                    </FormControl>
                                )}/>
                    <Controller control={control} name={"cValue"} rules={{ required:"Оберіть вашу роль!" }} render={({field})=>(
                        <FormControl>
                            <InputLabel  id="demo-simple-select-label">Сис Виміру</InputLabel>
                            <Select
                                label={"Сис виміру"}
                                SelectDisplayProps={
                                    {style: {
                                            color:'#01f6bd',
                                            width:150,
                                        }

                                    }}
                                value={getValues("cValue")}
                                color={"primary"}
                                variant={"outlined"}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={(event,)=>{
                                    field.onChange(event);
                                    resetField("consumptionRate")
                                }}
                            >
                                <MenuItem value={"кг"} >кг</MenuItem>
                                <MenuItem value={"л"}>л</MenuItem>

                            </Select>
                        </FormControl>
                    )} />
                    <Controller name={"consumptionRate"} control={control} rules={{ required:"Вкажіть!" }}
                                render={({field,fieldState})=>(
                                    <FormControl>
                                        <TextField
                                            type={"number"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white"},
                                                endAdornment: <InputAdornment color={"#01f6bd"} position="end"> {`${getValues("cValue").toUpperCase()}/ГА`} </InputAdornment>
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color:!fieldState.error?'#01f6bd':"red",
                                                }
                                            }}
                                            id="outlined-start-adornment"
                                            label="Норма внесення"
                                            variant="outlined"
                                            {...field}
                                        />
                                    </FormControl>
                                )}/>
                    <Controller name={"basePrice"} control={control} rules={{ required:"Вкажіть!" }}
                                render={({field,fieldState})=>(
                                    <FormControl>
                                        <TextField
                                            type={"number"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white"},
                                                endAdornment: <InputAdornment color={"#01f6bd"} position="end"> {`$/${getValues("cValue").toUpperCase()}`} </InputAdornment>
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color:!fieldState.error?'#01f6bd':"red",
                                                }
                                            }}
                                            id="outlined-start-adornment"
                                            label="Базова ціна"
                                            variant="outlined"
                                            {...field}
                                        />
                                    </FormControl>
                                )}/>

                    <Button onClick={onExit} color={"error"} variant={"contained"}>Вихід</Button>
                    <Button type={"submit"} variant={"contained"}>Зберегти</Button>
                </div>
            </div>
        </form>
    );
};

export default FertilizerCreateParamsForm;