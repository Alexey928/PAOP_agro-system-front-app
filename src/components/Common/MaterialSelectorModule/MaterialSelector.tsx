import React, {useMemo, useState} from 'react';
import {useAppSelector} from "../../../BLL/Store";
import {
    selectMaterialsByOptionalType,
    subTypesOfMaterial
} from "../../../Utils/selectors";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {MaterialItemType} from "../../../BLL/material-reducer";
import {MaterialType} from "../../../BLL/material-reducer";


interface IFormInputs {
    materialID:number
}

type MaterialSelectorType  = {
    rootMaterial?:MaterialType[]
    materialType:MaterialItemType
    materialSubType?:subTypesOfMaterial
    krud?:boolean
    onAddMaterial?:(material:MaterialType) => void
    task?:string
    onSelect?:(material:MaterialType)=>void
}

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

const MaterialSelector:React.FC<MaterialSelectorType> = ({rootMaterial,materialSubType ,materialType,krud,onAddMaterial,task,onSelect}) => {
    console.log("ms ", materialType)
    const plaseolderMaterial:MaterialType = {
        id:"",
        name:"заглушка",
        subType:"",
        type:materialType,
        cValue:"л",
        consumptionRate:"",
        metaData:"",
        basePrice:0,
        packaging:0,
        massOfThousen:0
    }
    const currentMaterials = useAppSelector(selectMaterialsByOptionalType(materialType,task));
    const [currentMaterial,setCurrentMaterial] = useState<MaterialType>(plaseolderMaterial);
    const hashByIDMaterials = useMemo(():{[key:string]:MaterialType}=>{
        const hash:{[key:string]:MaterialType} = {};
        if(rootMaterial){
            rootMaterial.forEach((it) => hash[`${it.id}`] = it);
            return hash
        }
      currentMaterials.forEach((it) => hash[`${it.id}`] = it)
        return hash
    },[currentMaterials])

    const setMaterialHeandler = (value:string) => {
        setCurrentMaterial(hashByIDMaterials[value]);
        if(onAddMaterial) {
            onAddMaterial(hashByIDMaterials[value])
        }
        if(onSelect){
            onSelect(hashByIDMaterials[value])
        }
    }
    return (
        <div style={krud?{width:350,height:120,
            flexWrap:"wrap",backgroundColor:"#090d44bd",
            padding:5,borderRadius:15,
            boxShadow:"rgb(68 71 108 / 75%) 2px 5px 16px 3px"}:
            {width:230,marginLeft:"auto",marginRight:"auto"}}>
            <FormControl  style={{width:krud? 200 : 230}}>
                    <InputLabel id="demo-simple-select-label">{materialType?materialType:"Оберіть матеріл"}</InputLabel>
                    <Select
                        SelectDisplayProps={
                            {style: {
                                    color:'#01f6bd',
                                    width: krud? 200 : 250,

                                }
                            }}
                        color={"secondary"}
                        variant={"outlined"}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentMaterial.id}
                        label={materialType ? materialType : "Оберіть матеріл"}
                        onChange={(e)=>{setMaterialHeandler(e.target.value)}}>
                        {!rootMaterial ?
                        currentMaterials.map((el:MaterialType)=> (
                                    <MenuItem value={el.id}>{el.name}</MenuItem>
                                )
                            ):
                        rootMaterial.map((el)=>(
                            <MenuItem value={el.id}>{el.name}</MenuItem>
                        ))

                        }
                    </Select>
                </FormControl>
            {krud && onAddMaterial ? <div>
                            <Button onClick={()=>{
                                onAddMaterial(currentMaterial)
                               }} variant={"contained"}>+</Button>
                            <Button variant={"contained"} color={"error"} style={{margin:2}}>DEl</Button>
                            <Button variant={"contained"} color={"secondary"}>EDIT</Button>
            </div>:<></>

            }

    </div>
    );
};
export default MaterialSelector;