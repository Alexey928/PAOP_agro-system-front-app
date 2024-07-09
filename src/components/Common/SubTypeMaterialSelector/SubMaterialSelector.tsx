import React, {useEffect, useState} from 'react';
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
    onSelect:(material:MaterialTaskDTOType[])=>void;
    removeContainedTasckMaterialEntity:(MaterialId:string)=>void;
};
const isValidMaterialTascEntity = (material:MaterialType, amount:number, whaterAmount:number):boolean=>{
    if(material.type==="хімія"){
        if(amount && whaterAmount){
            return true
       }
    }

    return !!amount
}
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
type TransitionStateType = {
    itemType:MaterialItemType,
    isDone:boolean,
    isParent:boolean,
    isContained:boolean,
    itemSubType:string,
    material:MaterialType
    planedAmount:number,
    water:number

}



const SubMaterialSelector: React.FC<SubMaterialSelectorPropsType> = ({ tasck,squerOftasck ,onSelect,removeContainedTasckMaterialEntity}) => {
    const filteredForSubType = useAppSelector(selectMaterialsForSybTypeSelector(tasck));
    const materialtypes = useSelector(selectMaterialsTypeForSubmaterialSelector(tasck));

    console.log(filteredForSubType,materialtypes)


    const [materialTypesLocal,setMaterialTypesLocal] = useState<MaterialItemType[]>(()=>[...materialtypes]);
    const [filteredForSubTypeLocal, setFilteredForSubTypeLocal]= useState<MaterialType[][]>(()=>[...filteredForSubType])
    const [selectorTransitionState, setSelectorTransitionState] = useState<TransitionStateType[]>(
        materialtypes.map((el) => ({
            itemType: el,
            isDone: false,
            isParent:true,
            isContained:false,
            itemSubType: "" ,
            material:plaseolderMaterial as MaterialType,
            planedAmount:0 ,
            water:el==="хімія" ? 50*squerOftasck : 0
        }
        ))
    );

    useEffect(()=>{
        const filtered = selectorTransitionState.filter((el,i)=>el.isContained);
        onSelect(filtered.map((el) => (
            {
                currentAmount:el.planedAmount,
                material:el.material,
                unnesesuryWater:el.water,
            } as MaterialTaskDTOType)))
    },[selectorTransitionState])

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
        tempType = [...tempType,type]
        tempFilteredForSubType=[...tempFilteredForSubType,materials]


            setFilteredForSubTypeLocal(tempFilteredForSubType);
            setMaterialTypesLocal(tempType);
            setSelectorTransitionState((prevState)=>(
                [...prevState,{itemType: tempType[0], isDone: false,isContained:false,isParent: false,
                    itemSubType: "" ,material: plaseolderMaterial,water:type==="хімія"?50*squerOftasck:0,planedAmount:0}]

        ))
    }

    const onselectSubtypeHandler = (iterator: number, subtype: string) => {
        setSelectorTransitionState((prevState) =>
            prevState.map((el, i) => (i === iterator ? { ...el, isDone: true, itemSubType: subtype } : el)));
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

    const setIsContayned = ( iterator:number,transitionState:TransitionStateType)=>{
        setSelectorTransitionState((prevState) =>
            prevState.map((el, i) => (i === iterator ? { ...el, isContained:true } : el)));
    }

    const onRemoveTasckMaterialEntity = ()=>{
        if(!selectorTransitionState[filteredForSubTypeLocal.length-1].isParent){
        setFilteredForSubTypeLocal(filteredForSubTypeLocal.filter((it,i)=> i!==filteredForSubTypeLocal.length-1));
        setMaterialTypesLocal(materialTypesLocal.filter((it,i)=> i!==filteredForSubTypeLocal.length-1));
        setSelectorTransitionState(selectorTransitionState.filter( (it,i) => i!==filteredForSubTypeLocal.length-1));
    }}
    return (
        <div>
            {<div style={{paddingRight:2,
                position:"fixed",
                top:0,left:0,right:0,
                backgroundColor:"transparent",
                height:42,
                zIndex:100,
                display:"flex",
                justifyContent:"flex-end"}}>
                <Button
                    variant={"contained"}
                    color={"error"}
                    onClick={onRemoveTasckMaterialEntity}
            >x
            </Button></div>}
            {
                filteredForSubTypeLocal[0][0] &&
                filteredForSubTypeLocal.map((el, i) => {
                    return (
                        Array.isArray(el) &&
                        selectorTransitionState[i] && !selectorTransitionState[i].isDone ? (
                            <div style={{marginTop:20}}
                            >
                            <FormControl key={i} style={{ width: 300 }}>
                                <InputLabel id={`demo-simple-select-label-${i}`}>{!selectorTransitionState[i].isParent?
                                    `Оберіть підтип матеріалу "${materialTypesLocal[i]}"`:
                                    `ДОДАТИ СЕЛЕКТОР ДЛЯ "${materialTypesLocal[i].toUpperCase()}"`}
                                </InputLabel>
                                <Select
                                    SelectDisplayProps={{
                                        style: {
                                            borderColor: '#f601ea',
                                            width: 300,
                                        },
                                    }}
                                    disabled={selectorTransitionState[i].isParent}
                                    color={"secondary"}
                                    variant={"outlined"}
                                    labelId={`demo-simple-select-label-${i}`}
                                    id={`demo-simple-select-${i}`}
                                    value={''}
                                    label={`Оберіть підтип матеріалу "${materialTypesLocal[i]}"`}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        !selectorTransitionState[i].isParent && onselectSubtypeHandler(i, value as string);
                                    }}
                                >
                                    {getSubTypes(materialTypesLocal[i]).map((subtype, index) => (
                                        <MenuItem key={index} value={subtype}>{subtype}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                                {selectorTransitionState[i].isParent && <Button
                                    variant={"contained"}
                                    color={"success"}
                                    style={{marginTop:5,marginBottom:5}}
                                    onClick={()=>{
                                    console.log(i,materialtypes[i]);
                                    addSelectors(i,materialTypesLocal[i],el)
                                }}>+</Button>}
                            </div>
                        ) : (<div style={{
                                position:"relative",
                                backgroundColor:"#080726",
                                padding:25,
                                paddingTop:45,
                                marginTop:25,
                                boxShadow:selectorTransitionState[i].isContained ? " #54ff00 1px 1px 16px 10px":
                                    "rgb(50 200 225 / 75%) 2px 2px 16px 10px"}}
                            >
                                {selectorTransitionState[i].isContained&&<Button
                                    disabled={!selectorTransitionState[i].isContained}
                                    variant={"contained"}
                                    style={
                                    {
                                    padding:0,
                                    backgroundColor:"lime",
                                    color:"white",
                                    borderRadius:25,
                                    position:"absolute",
                                    right:2,
                                    top:2
                                }}
                                >
                                V</Button>}
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
                                            style:{width:200,backgroundColor:selectorTransitionState[i].isContained?
                                                    '#448a91':'#00051e' ,color:"white"},
                                            endAdornment: <InputAdornment position="end"> {`л/га`} </InputAdornment>
                                        }}
                                        disabled={selectorTransitionState[i].isContained}
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
                                                backgroundColor:selectorTransitionState[i].isContained?
                                                    '#448a91':'#00051e' ,color:"white"},
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                color:'#01f6bd'
                                            }
                                        }}
                                        disabled={selectorTransitionState[i].isContained}
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
                                    <Button variant={selectorTransitionState[i].isContained?"outlined":"contained"}
                                            color={"secondary"}
                                            style={{marginTop:15}}
                                            onClick={()=>{
                                                isValidMaterialTascEntity (
                                                    selectorTransitionState[i].material,
                                                    selectorTransitionState[i].planedAmount,
                                                    selectorTransitionState[i].water
                                                ) &&
                                                !selectorTransitionState[i].isContained &&
                                                setIsContayned(i,selectorTransitionState[i])
                                            }}
                                    >ok
                                    </Button>}

                            </div>
                        )
                    );
                })}

        </div>
    );
};
export default SubMaterialSelector;



