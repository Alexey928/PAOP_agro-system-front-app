import React from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {CValueType, MaterialItemType} from "../../../../BLL/material-reducer";

interface IFormInputs{
    cropsName:string,
    type:MaterialItemType,
    cropsSubType:string,
    cropsMetadata:string,
    cValue:CValueType,
    consumptionRate:string,
    basePrice:number

}
type CropsCreateParamsFormPropsType = {
    onExit:()=> void
}

const CropsCreateParamsForm:React.FC<CropsCreateParamsFormPropsType> = ({onExit}) => {
    const { control, handleSubmit, formState, getValues} = useForm({
        defaultValues: {
            cropsName:"",
            type:"насіння",
            cropsSubType: "",// as culture group in this case
            cropsMetadata:"",// generation  in this case
            cValue:"шт",
            consumptionRate:"",//"1-3" as sample
            basePrice:0,
        },
    })
    const onSubmit:SubmitHandler<IFormInputs> = (data) => {
        const material = {
            name:data.cropsName.trim(),
            type:data.type.trim(),
            subType:data.cropsSubType.trim(),
            metadata:data.cropsMetadata.trim(),
        }
        const alert = "";
        if(!material.type||!material.name||!material.subType||!material.metadata){
            window.alert("Водіть коректно, десь ввели самі пробели!")
            return
        }
        console.log(data,material);
    }
    return (
        <form >
            <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
                <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:15,marginTop:60,marginBottom:120}}>
                    <Controller name={"cropsName"} control={control} rules={{ required:"Вкажіть!" }}
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
                    <Controller name={"cropsSubType"} control={control} rules={{ required:"Вкажіть!"}}
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
                                            label="Культура"
                                            variant="outlined"
                                            {...field}
                                        />
                                    </FormControl>

                                )}/>
                    <Controller control={control} name={"cropsMetadata"} rules={{ required:"Оберіть вашу роль!" }} render={({field})=>(
                        <FormControl>
                            <InputLabel  id="demo-simple-select-label">Генерація</InputLabel>
                            <Select
                                label={"Генерація"}
                                SelectDisplayProps={
                                    {style: {
                                            color:'#01f6bd',
                                            width:150,
                                        }

                                    }}
                                value={getValues("cropsMetadata")}
                                color={"primary"}
                                variant={"outlined"}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={(event,)=>{
                                    field.onChange(event);
                                }}
                            >
                                <MenuItem value={"Перша"} >Перша</MenuItem>
                                <MenuItem value={"Друга"}>Друга</MenuItem>
                                <MenuItem value={"Третя"}>Третя</MenuItem>
                                <MenuItem value={"Четверта"}>Четверта</MenuItem>
                                <MenuItem value={"П'ята"}>П'ята</MenuItem>

                            </Select>
                        </FormControl>
                    )} />
                    <Controller name={"consumptionRate"} control={control} rules={{ required:"Вкажіть!" }}
                                render={({field})=>(
                                    <FormControl>
                                        <TextField
                                            type={"number"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white"},
                                                endAdornment: <InputAdornment color={"#01f6bd"} position="end"> {`ГА`} </InputAdornment>
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color:'#01f6bd'
                                                }
                                            }}
                                            id="outlined-start-adornment"
                                            label="Норма висіву"
                                            variant="outlined"
                                            {...field}
                                        />
                                    </FormControl>

                                )}/>
                    <Button onClick={onExit} color={"error"} variant={"contained"}>Вихід</Button>
                </div>

            </div>
        </form>
    );
};

export default CropsCreateParamsForm;