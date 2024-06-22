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
    basePrice:number,
    masOfThausen: number|null,
    packaging:number|null

}
type CropsCreateParamsFormPropsType = {
    onExit:()=> void
}

const CropsCreateParamsForm:React.FC<CropsCreateParamsFormPropsType> = ({onExit}) => {
    const { control, handleSubmit,  getValues} = useForm({
        defaultValues: {
            cropsName:"",
            type:"насіння" as MaterialItemType,
            cropsSubType: "",// as culture group in this case
            cropsMetadata:"перша",// generation  in this case
            cValue:"шт" as CValueType,
            consumptionRate:"", //"1-3" as sample
            basePrice:0,
            masOfThausen:null,
            packaging:null
        },
    })
    const onSubmit:SubmitHandler<IFormInputs> = (data) => {
        const material = {
            name:data.cropsName.trim(),
            type:data.type.trim(),
            subType:data.cropsSubType.trim(),
            metadata:data.cropsMetadata.trim(),
        }
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
                    <Controller name={"packaging"} control={control} rules={{ required:"Вкажіть!" }}
                                render={({field})=>(
                                    <FormControl>
                                        <TextField
                                            type={"number"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white"},
                                                endAdornment: <InputAdornment color={"#01f6bd"} position="end"> {`ШТ`} </InputAdornment>
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color:'#01f6bd'
                                                }
                                            }}
                                            id="outlined-start-adornment"
                                            label="Штук у посів/один"
                                            variant="outlined"
                                            {...field}
                                        />
                                    </FormControl>
                                )}/>
                    <Controller name={"consumptionRate"} control={control} rules={{ required:"Вкажіть!" }}
                                render={({field})=>(
                                    <FormControl>
                                        <TextField
                                            type={"number"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white"},
                                                endAdornment: <InputAdornment color={"#01f6bd"} position="end"> {`ШТ/ГА`} </InputAdornment>
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color:'#01f6bd'
                                                }
                                            }}
                                            id="outlined-start-adornment"
                                            label="Рек норма висіву"
                                            variant="outlined"
                                            {...field}
                                        />
                                    </FormControl>
                                )}/>
                    <Controller name={"masOfThausen"} control={control} rules={{ required:"Вкажіть!" }}
                                render={({field})=>(
                                    <FormControl>
                                        <TextField
                                            type={"number"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white"},
                                                endAdornment: <InputAdornment color={"#01f6bd"} position="end"> {`КГ`} </InputAdornment>
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color:'#01f6bd'
                                                }
                                            }}
                                            id="outlined-start-adornment"
                                            label="Маса тисячі"
                                            variant="outlined"
                                            {...field}
                                        />
                                    </FormControl>
                                )}/>
                    <Controller name={"basePrice"} control={control} rules={{ required:"Вкажіть!" }}
                                render={({field})=>(
                                    <FormControl>
                                        <TextField
                                            type={"number"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white"},
                                                endAdornment: <InputAdornment color={"#01f6bd"} position="end"> {`$/П.О`} </InputAdornment>
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color:'#01f6bd'
                                                }
                                            }}
                                            id="outlined-start-adornment"
                                            label="Цна посев одиниці"
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

export default CropsCreateParamsForm;