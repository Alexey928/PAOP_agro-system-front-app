
import {materialsStateType, MaterialType} from "../BLL/material-reduser";

export const materialSortByType = (materials:MaterialType[]):materialsStateType=>{
    const sorted:materialsStateType = {
        fertilizer:[],
        crops:[],
        fuel:[],
        package:[]

    };
    materials.forEach((material)=>{
        switch (material.type) {
            case "добрива":
                sorted.fertilizer.push(material);
                break;
            case "насіння":
                sorted.crops.push(material);
                break;
            case "пальне":
                sorted.fuel.push(material);
                break
            case "пакування":
                sorted.package.push();
                break;



        }
    })
    return{}
}