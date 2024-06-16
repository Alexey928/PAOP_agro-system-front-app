import React from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {CValueType, MaterialItemType} from "../../../../BLL/material-reducer";


interface IFormInputs{
    chemistryName:string,
    type:MaterialItemType,
    chemistrySubType:string,
    chemistryMetadata:string,
    cValue:CValueType,
    consumptionRate:string,
    basePrice:number
}
export type CemicalCreateParamsFormPropsType = {
    onExit:()=>void
}

const CemicalCreateParamsForm:React.FC<CemicalCreateParamsFormPropsType> = ({onExit}) => {
    const { control, handleSubmit, formState, getValues,resetField,} = useForm({
        defaultValues: {
            chemistryName:"",
            type:"хімія" as MaterialItemType,
            chemistrySubType: "",// as cemikal group in this case
            chemistryMetadata:"",// діючі речовини  in this case
            cValue:"л" as CValueType,
            consumptionRate:"",//"1-3" as sample
            basePrice:0,
        },
    })
    const onSubmit:SubmitHandler<IFormInputs> = (data) => {
        const material = {
            name:data.chemistryName.trim(),
            type:data.type.trim(),
            subType:data.chemistrySubType.trim(),
            metadata:data.chemistryMetadata.trim(),
        }
        const alert = "";
        if(!material.type||!material.name||!material.subType||!material.metadata){
            window.alert("Водіть коректно, десь ввели самі пробели!")
            return
        }
        console.log(data,material);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
                <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:15,marginTop:60,marginBottom:120}}>

                    <Controller name={"chemistryName"} control={control} rules={{ required:"Вкажіть!" }}
                                render={({field,fieldState})=>(
                                    <FormControl>
                                        <TextField
                                            type={"text"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white"},

                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color:!fieldState.error?'#01f6bd':"red",
                                                }
                                            }}
                                            id="outlined-start-adornment"
                                            label="Назва"
                                            variant="outlined"
                                            {...field}
                                        />
                                    </FormControl>

                                )}/>
                    <Controller control={control} name={"chemistrySubType"} rules={{ required:"Оберіть вашу роль!" }} render={({field})=>(
                        <FormControl>
                            <InputLabel  id="demo-simple-select-label">Тип хімії</InputLabel>
                            <Select
                                label={"Тип хімії"}
                                SelectDisplayProps={
                                    {style: {
                                            color:'#01f6bd',
                                            width:150,
                                        }

                                    }}
                                value={getValues("chemistrySubType")}
                                color={"primary"}
                                variant={"outlined"}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={(event,)=>{
                                    field.onChange(event);
                                }}
                            >
                                <MenuItem value={"Гербецид"} >Гербецид</MenuItem>
                                <MenuItem value={"Фунгіцид"}>Фунгіцид</MenuItem>
                                <MenuItem value={"Інсектицид"}>Інсектицид</MenuItem>
                                <MenuItem value={"Десикант"}>Десикант</MenuItem>
                                <MenuItem value={"Протруйник"}>Протруйник</MenuItem>
                                <MenuItem value={"Регулятор росту"}>Регулятор росту</MenuItem>
                                <MenuItem value={"Вітамини та пожив/речовини"}>Вітамини та пожив/речовини</MenuItem>
                            </Select>
                        </FormControl>
                    )} />
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
                                <MenuItem value={"шт"}>шт</MenuItem>
                            </Select>
                        </FormControl>
                    )} />

                    <Controller name={"chemistryMetadata"} control={control} rules={{ required:"Вкажіть!" }}
                                render={({field,fieldState})=>(
                                    <FormControl>
                                        <TextField
                                            type={"text"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white"},

                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color:!fieldState.error?'#01f6bd':"red",
                                                }
                                            }}
                                            id="outlined-start-adornment"
                                            label="Діючі речовини"
                                            variant="outlined"
                                            {...field}
                                        />
                                    </FormControl>

                                )}/>
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
export default CemicalCreateParamsForm;