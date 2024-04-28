import {useState} from "react";
type MowingTheCropTaskType = {
     fieldID:string
    status: "isDone" | "inProgres"
     type: "MOWING_THE_CROP"
     startDate: Date
     endDate: Date
    harvesterID:string
}
type SprayingTaskType = {
     fieldID:string
    status: "isDone" | "inProgres"
    type: "SPRAYING_GROUP"
     startDate: Date
     endDate: Date
     sprayingMachineId:string
 }
 type SoilWorksTaskType = {
     fieldID:string
     status: "isDone" | "inProgres"
     type: "SOIL_GROUP"
     startDate: Date
     endDate: Date
     tractorID:string
 }
 type FertilizationTasksType = {
    fieldID:string
     status: "isDone" | "inProgres"
     type: "FERTILIZATION_GROUP"
     startDate: Date
     endDate: Date
 }
//____________________________________________________________________________

export type FieldType = {
     id: string;// forigen
     trajectory: number[][];
    name: string | null;
     sqere: number| null;
 }
  //in this case "id" is forigen key from FieldType
export  type SoilTasksTypes = {
     [id:string]:{
        SOIL_GROUP:Array<SoilWorksTaskType>;
        FERTILIZATION_GROUP:Array<FertilizationTasksType>;
    }
}
 export type CultureItemType = {
     id:string,
     name:string,
     variantyName:string,
     collor:string,
     sqere:number
 }
 export type CultureType = {
     [id:string]:Array<CultureItemType>
 }
//  in this case "id" is forigen key from CultureType children
 export type CultureTaskType = {
     [id:string]:{
         "SPRAYING_GROUP":Array<SprayingTaskType>;
         "MOWING_THE_CROP":Array<MowingTheCropTaskType>
     }
}

type CultureColorsType =  {
    id:string
    colorName:string
    hex:string
}
export const tempRandomiser = ():string=>{
 return  Math.random().toString();
}
export const useFields = () => {
    const [agroFields, setAgroFields] = useState<Array<FieldType>>([]);
    const [fieldTasks, setFieldTasks] = useState<SoilTasksTypes>({
        "id": {
            SOIL_GROUP: [],
            FERTILIZATION_GROUP: [],
        }
    });
    const [cultureTasks, setCultureTasks] = useState<CultureTaskType>({
        "id": {
            MOWING_THE_CROP: [],
            SPRAYING_GROUP: [],
        }
    });
    const [fieldCultures , setFieldCulture] = useState<CultureType>({});
    const [thoisedFieldID, setThoisedFieldID] = useState<string>();

    const setNewField = (trajectory: number[][]) => {
        const tempID = tempRandomiser();
        setAgroFields([...agroFields, {id: tempID, name: null, sqere: null, trajectory}]);
        setFieldCulture({...fieldCultures,[tempID]:[]});
        setThoisedFieldID(tempID);
    }
    const deleteField = (FieldID:string) => {
        setAgroFields(agroFields.filter((el)=>el.id!==FieldID));
        delete fieldCultures[FieldID];
    }
    const setFieldParams = (id: string, name: string, sqere: number) => {
        setAgroFields(agroFields.map((el) => el.id === id ? {...el, name,sqere} : el));
    }
    const setCulture = (FieldID:string,name:string,sqere:number,variantyName:string,collor:string)=>{
        setFieldCulture({...fieldCultures,[FieldID]:[{id:tempRandomiser(),name,sqere,collor,variantyName},...fieldCultures[FieldID]]});
    }
    const removeCulture =(FieldID:string,cultureID:string)=>{
        setFieldCulture({...fieldCultures,
            [FieldID]:fieldCultures[FieldID].filter((el) => el.id !== cultureID)
        });
    }

    return {
        agroFields,
        thoisedFieldID,
        fieldTasks,
        cultureTasks,
        fieldCultures,
        setThoisedFieldID,
        setNewField,
        setFieldParams,
        setCulture,
        removeCulture,
        deleteField,
    }
}
const initialColors: CultureColorsType[]= [
    {
        id:"1",
        colorName:"красный",
        hex:"#f10303"
    },
    {
        id:"2",
        colorName:"зеленый",
        hex:"#37bb01"
    },
    {
        id:"3",
        colorName:"синий",
        hex:"#0022ff"
    },
    {
        id:"4",
        colorName:"желтый",
        hex:"#e5c722"
    },
    {
        id:"5",
        colorName:"сереневый",
        hex:"#cc00ff"
    },
]
export const useColors = () => {
    const[cultureColors, setCultureCollors] = useState<CultureColorsType[]>(initialColors)
    const setColor = (colorName:string,hex:string)=>{
        setCultureCollors([...cultureColors,{id:tempRandomiser(),colorName,hex}])
    }
    const remoweColor = (id:string)=>{
        setCultureCollors(cultureColors.filter((el)=>el.id!==id))
    }
    return{
        cultureColors,
        setColor,
        remoweColor
    }
}

