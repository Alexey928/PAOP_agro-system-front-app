import React, { useState } from 'react';
import {Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import { useAppSelector } from "../../../BLL/Store";
import { selectMaterialsForSybTypeSelector, selectMaterialsTypeForSubmaterialSelector } from "../../../Utils/selectors";
import {MaterialItemType, MaterialType} from "../../../BLL/material-reducer";
import { useSelector } from "react-redux";
import MaterialSelector from "../MaterialSelectorModule/MaterialSelector";
import {MaterialTaskDTOType} from "../../../BLL/fieldTaskReduser";

type SubMaterialSelectorPropsType = {
    squerOftasck:number
    tasck: string;
    onSelect:(material:MaterialTaskDTOType)=>void;
};

const isFieldNedet = (material:MaterialType)=>{
    if(material){
        switch (material.type){
            case "хімія":
                return true
            default:
                return false
        }

    }
    return false
}


const subtypes = {
    cemestry: ["Гербецид", "Фунгіцид", "Інсектицид", "Десикант", "Протруйник", "Регулятор росту", "Вітамини та пожив/речовини"],
    fertilizer: ["органичні-сухі","органичні-рідкі", "мінеральні-сухі", "мінеральні-рідкі"],
    crops:["зернові","зернові-озимі","бобові","пасленові","корнеплоди","масленичні","технічні"],
    suply:["присипки","пакування"]
};

const getSubTypes = (type: MaterialItemType): string[] => {
    switch (type) {
        case "хімія":
            return subtypes.cemestry;
        case "добрива":
            return subtypes.fertilizer;
        case "супутні":
            return subtypes.suply
        case "насіння":
            return subtypes.crops
        default:
            return [];
    }
};

const plaseolderMaterial:MaterialType = {
    id:"",
    name:"заглушка",
    subType:"",
    type:"насіння",
    cValue:"л",
    consumptionRate:"",
    metaData:"",
    basePrice:0,
    packaging:0,
    massOfThousen:0
}

const SubMaterialSelector: React.FC<SubMaterialSelectorPropsType> = ({ tasck,squerOftasck }) => {
    const filteredForSubType = useAppSelector(selectMaterialsForSybTypeSelector(tasck));
    const materialtypes = useSelector(selectMaterialsTypeForSubmaterialSelector(tasck));

    console.log(filteredForSubType,materialtypes)


    const [materialTypesLocal,setMaterialTypesLocal] = useState<MaterialItemType[]>(()=>[...materialtypes]);
    const [filteredForSubTypeLocal, setilteredForSubTypeLocal]= useState<MaterialType[][]>(()=>[...filteredForSubType])
    const [selectorTransitionState, setSelectorTransitionState] = useState(
        materialtypes.map((el) => ({
            itemType: el,
            isDone: false,
            isContayned:false,
            itemSubType: "" ,
            material:plaseolderMaterial as MaterialType,
            planedAmount:0 ,
            water:0

        }
        ))
    );

    const addSelectors = (i:number,type:MaterialItemType, materials:MaterialType[])  =>{
        let tempType = [...materialTypesLocal];
        let tempFilteredForSubType = filteredForSubTypeLocal.map((el)=>{
            return(
            el.map((el)=>{
                return(
                    {...el}
                )
            }))
        });
        if(!i){
            tempType = [type,...tempType]
            tempFilteredForSubType=[materials,...tempFilteredForSubType ]
        }else {

            tempType = [...tempType,type]
            tempFilteredForSubType=[...tempFilteredForSubType,materials]
        }

            setilteredForSubTypeLocal(tempFilteredForSubType);
            setMaterialTypesLocal(tempType);
            setSelectorTransitionState((prevState)=>(!i ?
                [...prevState,{itemType: tempType[0], isDone: false,isContayned:false,
                    itemSubType: "" ,material: plaseolderMaterial,water:0,planedAmount:0}]:
                [...prevState,{itemType: tempType[1], isDone: false,isContayned:false,
                    itemSubType: "",material: plaseolderMaterial,water: 0,planedAmount: 0 }]
        ))



    }

    const onselectSubtypeHandler = (iterator: number, subtype: string) => {
        setSelectorTransitionState((prevState) =>
            prevState.map((el, i) => (i === iterator ? { ...el, isDone: true, itemSubType: subtype } : el))
        );
    };
    const onSelectMaterial =(material:MaterialType,iterator:number)=>{
        setSelectorTransitionState((prevState) =>
            prevState.map((el, i) => (i === iterator ? { ...el, material} : el))
        );
    }
    const onChangeAmount = (amount:number,iterator:number)=>{
        setSelectorTransitionState((prevState) =>
            prevState.map((el, i) => (i === iterator ? { ...el, planedAmount: amount*squerOftasck} : el)));
    }
    const onChangeWater = (waterNorm:number, iterator:number)=>{
        setSelectorTransitionState((prevState) =>
            prevState.map((el, i) => (i === iterator ? { ...el, water:waterNorm * squerOftasck} : el)));
    }

    const setIsContayned = ( iterator:number)=>{
        setSelectorTransitionState((prevState) =>
            prevState.map((el, i) => (i === iterator ? { ...el, isContayned:true } : el)));
    }
    return (
        <>
            {
                filteredForSubTypeLocal[0][0] &&
                filteredForSubTypeLocal.map((el, i) => {
                    return (
                        Array.isArray(el) &&
                        selectorTransitionState[i] && !selectorTransitionState[i].isDone ? (
                            <div>
                            <FormControl key={i} style={{ width: 300 }}>
                                <InputLabel id={`demo-simple-select-label-${i}`}>{`Оберіть підтип матеріалу "${materialTypesLocal[i]}"`}</InputLabel>
                                <Select
                                    SelectDisplayProps={{
                                        style: {
                                            color: '#01f6bd',
                                            width: 300,
                                        },
                                    }}
                                    color={"secondary"}
                                    variant={"outlined"}
                                    labelId={`demo-simple-select-label-${i}`}
                                    id={`demo-simple-select-${i}`}
                                    value={''}
                                    label={`Оберіть підтип матеріалу "${materialTypesLocal[i]}"`}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        onselectSubtypeHandler(i, value as string);
                                    }}
                                >
                                    {getSubTypes(materialTypesLocal[i]).map((subtype, index) => (
                                        <MenuItem key={index} value={subtype}>{subtype}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                                <Button variant={"contained"} onClick={()=>{
                                    console.log(i,materialtypes[i]);
                                    addSelectors(i,materialTypesLocal[i],el)
                                }}>+</Button>
                            </div>
                        ) : (<div style={{backgroundColor:"#080726",padding:25,marginTop:10, boxShadow:"rgb(109 118 225 / 75%) 1px 1px 16px 10px"}}>
                                <MaterialSelector
                                onSelect={(material)=>{onSelectMaterial(material,i)}}
                                key={i}
                                materialType={materialTypesLocal[i]}
                                rootMaterial={el.filter((element) => element.subType === selectorTransitionState[i].itemSubType)}
                            />
                                {
                                    selectorTransitionState[i].material.id && <TextField
                                    style={{marginTop:10}}
                                        inputProps={{
                                            style:{width:200,backgroundColor:selectorTransitionState[i].isContayned?
                                                    '#448a91':'#00051e' ,color:"white"},
                                            endAdornment: <InputAdornment position="end"> {`л/га`} </InputAdornment>
                                        }}
                                        disabled={selectorTransitionState[i].isContayned}
                                        type={"number"}
                                        variant={"outlined"}
                                        label={`Внесення по ...(${selectorTransitionState[i].material.cValue}/Га)`}
                                        onChange={(e)=>{
                                            console.log(e.target.value);
                                            onChangeAmount(+e.target.value,i);
                                        }}
                                    />

                                }
                                {
                                    selectorTransitionState[i].material.id &&
                                    isFieldNedet(selectorTransitionState[i].material)&&
                                    <TextField
                                        defaultValue={50}
                                        id="outlined-start-adornment"
                                        style={{marginTop:10}}
                                        inputProps={{
                                            style:{width:200,
                                                backgroundColor:selectorTransitionState[i].isContayned?
                                                    '#448a91':'#00051e' ,color:"white"},
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                color:'#01f6bd'
                                            }
                                        }}
                                        disabled={selectorTransitionState[i].isContayned}
                                        type={"number"}
                                        variant={"outlined"}
                                        label= {`Вилив по... (л)`}
                                        onChange={(e)=>{
                                            console.log(e.target.value);
                                            onChangeWater(+e.target.value,i);
                                        }}
                                    />
                                }
                                {selectorTransitionState[i].material.id && !(selectorTransitionState[i].material.type!=="хімія") &&
                                    <Button variant={selectorTransitionState[i].isContayned?"outlined":"contained"}
                                            color={"secondary"}
                                            style={{marginTop:15}}
                                            onClick={()=>{
                                                setIsContayned(i)
                                            }}
                                    >ok
                                    </Button>}

                            </div>
                        )
                    );
                })}

        </>
    );
};
export default SubMaterialSelector;
