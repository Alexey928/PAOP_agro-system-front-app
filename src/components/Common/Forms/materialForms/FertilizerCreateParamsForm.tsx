import React from 'react';
import {createMaterial_TC, CValueType, MaterialItemType} from "../../../../BLL/material-reducer";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useAppDispatch} from "../../../../BLL/Store";


interface IFormInputs{
    fertilizeName:string,
    fertilizeType:MaterialItemType,
    fertilizeSubType:string,// тип добрива органика хімія органична хімія
    fertilizeMetadata:string, // діючі речовини
    cValue:CValueType,
    consumptionRate:string,//"1-3" as sample
    packaging:number|null
    basePrice:number,

}
export type FertilizerCreateParamsFormPropsType = {
    onExit:()=>void
}
const FertilizerCreateParamsForm:React.FC<FertilizerCreateParamsFormPropsType> = ({
    onExit}) => {
    const dispatch = useAppDispatch();
    const { control, handleSubmit, formState, getValues,resetField} = useForm({
        defaultValues: {
            fertilizeName:"",
            fertilizeType:"добрива" as MaterialItemType,
            fertilizeSubType:"",
            fertilizeMetadata:"",
            cValue:"кг" as CValueType,
            consumptionRate:"",
            packaging:null,
            basePrice:0,

        },
    })
    const onSubmit:SubmitHandler<IFormInputs> = (data) => {
        const material = {
            name:data.fertilizeName.trim(),
            type:data.fertilizeType,
            subType:data.fertilizeSubType.trim(),
            metaData:data.fertilizeMetadata.trim()===""?"not this case":data.fertilizeMetadata,
            consumptionRate:data.consumptionRate.trim(),
            basePrice: data.basePrice ?? 0,
            massOfThousen:0,
            packaging:data.packaging??0,
            cValue:data.cValue

        }
        const alert = "";
        if(!material.type||!material.name||!material.subType||!material.metaData||
            !material.cValue||!material.packaging){
            console.log(material)
            window.alert("Водіть коректно, десь ввели самі пробели!")
            return
        }
        console.log(data,material);
        dispatch(createMaterial_TC(material))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
                <div style={{marginTop:10}}>Створення матеріалу типу <span style={{color:"#fca402"}}>ДОБРИВА</span></div>
                <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:15,marginTop:60,marginBottom:120}}>
                    <Controller name={"fertilizeName"} control={control} rules={{ required:"Вкажіть!" }}
                                render={({field})=>(
                                    <FormControl>
                                        <TextField
                                            type={"text"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white",width:250},
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
                    <Controller control={control} name={"fertilizeSubType"} rules={{ required:"Оберіть!" }} render={({field})=>(
                        <FormControl>
                            <InputLabel  id="demo-simple-select-label">Тип добрива</InputLabel>
                            <Select
                                label={"Тип добрива"}
                                SelectDisplayProps={
                                    {style: {
                                            color:'#01f6bd',
                                            width:200,
                                        }

                                    }}
                                value={getValues("fertilizeSubType")}
                                color={"primary"}
                                variant={"outlined"}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={(event,)=>{
                                    field.onChange(event);
                                }}
                            >
                                <MenuItem value={"Органичні(сухі)"} >Органичні(сухі)</MenuItem>
                                <MenuItem value={"Мінеральні(сухі)"}>Мінеральні(сухі)</MenuItem>
                                <MenuItem value={"Мінеральні(рідкі)"}>Мінеральні(рідкі)</MenuItem>
                                <MenuItem value={"Органичні(рідкі)"}>Органичні(рідкі)</MenuItem>
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
                                            width:200,
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
                                                style: {backgroundColor: '#00051e' ,color:"white",width:250},
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
                    <Controller name={"packaging"} control={control} rules={{ required:"Вкажіть!" }}
                                render={({field})=>(
                                    <FormControl>
                                        <TextField
                                            type={"number"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white",width:250},
                                                endAdornment: <InputAdornment color={"#01f6bd"} position="end"> {`${getValues("cValue").toUpperCase()}`} </InputAdornment>
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color:'#01f6bd'
                                                }
                                            }}
                                            id="outlined-start-adornment"
                                            label="Пакування по"
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
                                                style: {backgroundColor: '#00051e' ,color:"white",width:250},
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
                    <div style={{width:250,display:"flex",alignItems:"center",justifyContent:"space-around"}}>
                        <Button onClick={onExit} color={"error"} variant={"contained"}>Вихід</Button>
                        <Button type={"submit"} variant={"contained"}>Зберегти</Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default FertilizerCreateParamsForm;