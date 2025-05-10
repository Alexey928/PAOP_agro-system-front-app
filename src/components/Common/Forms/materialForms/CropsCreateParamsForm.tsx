import React from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {createMaterial_TC, CValueType, MaterialItemType} from "../../../../BLL/material-reducer";
import {getSubTypes} from "../../SubTypeMaterialSelector/SubMaterialSelector";
import {useAppDispatch} from "../../../../BLL/Store";

interface IFormInputs{
    cropsName:string,
    type:MaterialItemType,
    cropsSubType:string,
    cropsMetadata:string,
    cValue:CValueType,
    consumptionRate:string,
    basePrice:number|null,
    masOfThausen: number|null,
    packaging:number|null

}
type CropsCreateParamsFormPropsType = {
    onExit:()=> void
}

const CropsCreateParamsForm:React.FC<CropsCreateParamsFormPropsType> = ({onExit}) => {
    const dispatch = useAppDispatch();
    const { control, handleSubmit,  getValues, formState} = useForm({
        defaultValues: {
            cropsName:"",
            type:"насіння" as MaterialItemType,
            cropsSubType: "",// as culture group in this case
            cropsMetadata:"",// generation  in this case
            cValue:"шт" as CValueType,
            consumptionRate:"", //"1-3" as sample
            basePrice:null,
            masOfThausen:null,
            packaging:null
        },
    })

    const onSubmit:SubmitHandler<IFormInputs> = (data) => {
        const material = {
            name:data.cropsName.trim(),
            type:data.type,
            subType:data.cropsSubType.trim(),
            metaData:data.cropsMetadata.trim(),
            consumptionRate:data.consumptionRate,
            basePrice:Number(data.basePrice)??0,
            massOfThousen:data.masOfThausen??0,
            packaging:data.packaging??0,
            cValue:data.cValue

        }
        if(!material.type||!material.name||!material.subType||!material.metaData||
            !material.consumptionRate||!material.basePrice||!material.massOfThousen||
            !material.packaging){
            window.alert("Водіть коректно, мабуть десь ввели самі пробели!")
            return
        }
        dispatch(createMaterial_TC(material));
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
                <div style={{marginTop:10}}>Створення матеріалу типу <span style={{color:"#7af803"}}>НАСІННЯ</span></div>
                <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:15,marginTop:60,marginBottom:120}}>
                    <Controller name={"cropsName"} control={control} rules={{ required:"Вкажіть!" }}
                                render={({field,fieldState})=>(
                                    <FormControl>
                                        <TextField
                                            type={"text"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white",width:250},

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
                    <Controller name={"cropsSubType"} control={control} rules={{ required:"Вкажіть!"}}
                                render={({field,fieldState})=>(
                                    <FormControl error={!!fieldState.error}>
                                        <InputLabel  id="demo-simple-select-label">Культура</InputLabel>
                                        <Select
                                            label={"Культура"}
                                            SelectDisplayProps={
                                                {style: {
                                                        color:'#01f6bd',
                                                        width:200,
                                                    }
                                                }}
                                            value={getValues("cropsSubType")}
                                            color={"primary"}
                                            variant={!fieldState.error?"outlined":"standard"}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            onChange={(event,)=>{
                                                field.onChange(event);
                                            }}
                                        >
                                            {getSubTypes("насіння").map((el ,i)=>{
                                                return(<MenuItem key={i} value={el} >{el}</MenuItem>)
                                            })}


                                        </Select>
                                    </FormControl>
                                )}


                                />
                    <Controller control={control} name={"cropsMetadata"} rules={{ required:"Оберіть вашу роль!" }} render={({field,fieldState})=>(
                        <FormControl error={!!fieldState.error}>
                            <InputLabel  id="demo-simple-select-label">Генерація</InputLabel>
                            <Select
                                label={"Генерація"}
                                SelectDisplayProps={
                                    {style: {
                                            color:'#01f6bd',
                                            width:200,
                                        }

                                    }}
                                value={getValues("cropsMetadata")}
                                color={"primary"}
                                variant={!fieldState.error?"outlined":"standard"}
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
                                render={({field,fieldState})=>(
                                    <FormControl>
                                        <TextField
                                            type={"number"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white",width:250},
                                                endAdornment: <InputAdornment color={"#01f6bd"} position="end"> {`ШТ`} </InputAdornment>
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color:!fieldState.error?'#01f6bd':"red",
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
                                render={({field,fieldState})=>(
                                    <FormControl>
                                        <TextField
                                            type={"number"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white",width:250},
                                                endAdornment: <InputAdornment color={"#01f6bd"} position="end"> {`ШТ/ГА`} </InputAdornment>
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color:!fieldState.error?'#01f6bd':"red",
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
                                render={({field,fieldState})=>(
                                    <FormControl>
                                        <TextField
                                            type={"number"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white",width:250},
                                                endAdornment: <InputAdornment color={"#01f6bd"} position="end"> {`КГ`} </InputAdornment>
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color:!fieldState.error?'#01f6bd':"red",
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
                                render={({field,fieldState})=>(
                                    <FormControl>
                                        <TextField
                                            type={"number"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white",width:250},
                                                endAdornment: <InputAdornment color={"#01f6bd"} position="end"> {`$/П.О`} </InputAdornment>
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color:!fieldState.error?'#01f6bd':"red",
                                                }
                                            }}
                                            id="outlined-start-adornment"
                                            label="Цна посев одиниці"
                                            variant="outlined"
                                            {...field}
                                        />
                                    </FormControl>
                                )}/>
                    <div style={{width:250,display:"flex",alignItems:"center",justifyContent:"space-around"}}>
                        <Button onClick={onExit} color={"error"} variant={"contained"}>Вихід</Button>
                        <Button type={"submit"} variant={"contained"} disabled={formState.isSubmitted}>Зберегти</Button>
                    </div>
                </div>

            </div>
        </form>
    );
};

export default CropsCreateParamsForm;