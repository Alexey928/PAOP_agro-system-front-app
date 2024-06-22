import React from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {createMaterial_TC, CValueType, MaterialItemType} from "../../../../BLL/material-reducer";
import {useAppDispatch} from "../../../../BLL/Store";


interface IFormInputs{
    chemistryName:string,
    type:MaterialItemType,
    chemistrySubType:string,
    chemistryMetadata:string,
    cValue:CValueType,
    consumptionRate:string,
    basePrice:string
    packaging:number|null
}
export type CemicalCreateParamsFormPropsType = {
    onExit:()=>void
}


const CemicalCreateParamsForm:React.FC<CemicalCreateParamsFormPropsType> = ({onExit}) => {
    const dispatch = useAppDispatch();
    const { control, handleSubmit, getValues,resetField,} = useForm({
        defaultValues: {
            chemistryName:"",
            type:"хімія" as MaterialItemType,
            chemistrySubType: "",// as cemikal group in this case
            chemistryMetadata:"",// діючі речовини  in this case
            cValue:"л" as CValueType,
            consumptionRate:"",//"1-3" as sample
            basePrice:"",
            packaging:null
        },
    })
    const onSubmit:SubmitHandler<IFormInputs> = (data) => {
        const material = {
            name:data.chemistryName.trim(),
            type:data.type.trim() as MaterialItemType,
            subType:data.chemistrySubType.trim(),
            metaData:data.chemistryMetadata.trim(),
            consumptionRate:data.consumptionRate.trim(),
            basePrice:Number(data.basePrice),
            massOfThousen:0 as number,
            packaging:data.packaging??0,
            cValue:data.cValue,
        }
        const alert = "";
      if( !material.type||
          !material.name||
          !material.subType||
          !material.metaData||
          !material.consumptionRate||
          !material.packaging
        )
        {
            window.alert("Водіть коректно, десь ввели самі пробели!")
            return
        }
        dispatch(createMaterial_TC(material))
        console.log(data,material);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
                <div style={{width:300,display:"flex",flexDirection:"column",alignItems:"center",gap:15,marginTop:60,marginBottom:120}}>
                    <Controller name={"chemistryName"} control={control} rules={{ required:"Вкажіть!" }}
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
                    <Controller control={control} name={"chemistrySubType"} rules={{ required:"Оберіть вашу роль!" }} render={({field,fieldState})=>(
                        <FormControl error={!!fieldState.error}>
                            <InputLabel  id="demo-simple-select-label">Тип хімії</InputLabel>
                            <Select
                                label={"Тип хімії"}
                                SelectDisplayProps={
                                    {style: {
                                            color:'#01f6bd',
                                            width:200,
                                        }

                                    }}
                                variant={!fieldState.error?"outlined":"standard"}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                {...field}
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
                                                style: {backgroundColor: '#00051e' ,color:"white",width:250},

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
                                render={({field,fieldState})=>(
                                    <FormControl>
                                        <TextField
                                            type={"number"}
                                            InputProps={{
                                                style: {backgroundColor: '#00051e' ,color:"white",width:250},
                                                endAdornment: <InputAdornment color={"#01f6bd"} position="end"> {`${getValues("cValue").toUpperCase()}`} </InputAdornment>
                                            }}
                                            InputLabelProps={{
                                                style: {
                                                    color:!fieldState.error?'#01f6bd':"red",
                                                }
                                            }}
                                            id="outlined-start-adornment"
                                            label="Фасування по"
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
                    <Button onClick={onExit} color={"error"} variant={"contained"}>Вихід</Button>
                    <Button type={"submit"} variant={"contained"}>Зберегти</Button>
                    </div>

            </div>
        </form>
    );
};
export default CemicalCreateParamsForm;