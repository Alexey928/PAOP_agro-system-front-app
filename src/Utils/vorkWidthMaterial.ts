import {initialMaterialStateCreator, materialsStateType, MaterialType, remoweMaterial} from "../BLL/material-reduser";

export const materialSortByType = (materials:MaterialType[],  state?:materialsStateType):materialsStateType=>{

    const sortedMaterials:materialsStateType = state ? initialMaterialStateCreator(): state!

    materials.forEach((material)=>{
        switch (material.type) {
            case "добрива":
                sortedMaterials.fertilizer.push(material);
                break;
            case "насіння":
                sortedMaterials.crops.push(material);
                break;
            case "пальне":
                sortedMaterials.fuel.push(material);
                break
            case "пакування":
                sortedMaterials.package.push(material);
                break;
            case "супутні":
                sortedMaterials.suply.push(material)
                break
            case "хімія":
                sortedMaterials.kemikal.push(material)
        }
    })
    return sortedMaterials
}

 export const removeByTypeOfTask =  (action:ReturnType<typeof remoweMaterial>,state:materialsStateType)=>{
    switch (action.payload.type) {
        case "хімія":
            return {...state,kemikal: state.kemikal.filter(it=>it.id!==action.payload.id)}
        case "супутні":
            return {...state,suply: state.suply.filter(it=>it.id!==action.payload.id)}
        default:
        return {...state}

    }

}
export const updateMaterialHeandler = (material:MaterialType,state:materialsStateType):materialsStateType=>{
    switch (material.type) {
        case "хімія":
            return {...state,kemikal: state.kemikal.map(it => it.id!==material.id ? it : material)}
        case "супутні":
            return {...state,suply: state.suply.filter(it=>it.id!==material.id)}
        default:
            return {...state}

    }

}