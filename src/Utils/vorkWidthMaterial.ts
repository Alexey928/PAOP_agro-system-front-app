import {initialMaterialStateCreator, materialsStateType, MaterialType, remoweMaterialAC} from "../BLL/material-reducer";

export const materialSortByType = (materials:MaterialType[],  state?:materialsStateType):materialsStateType=>{

    const sortedMaterials:materialsStateType = state ? state : initialMaterialStateCreator();

    materials.forEach((material)=>{
        switch (material.type) {
            case "добрива":
                sortedMaterials.fertilizer.push(material);
                break;
            case "насіння":
                sortedMaterials.crops.push(material);
                break;

            case "супутні":
                sortedMaterials.suply.push(material)
                break
            case "хімія":
                sortedMaterials.chemistry.push(material)
        }
    })
    return {...sortedMaterials}
}

 export const removeByTypeOfTask =  (action:ReturnType<typeof remoweMaterialAC>, state:materialsStateType)=>{
    switch (action.payload.type) {
        case "хімія":
            return {...state,chemistry: state.chemistry.filter(it=>it.id!==action.payload.id)};
        case "супутні":
            return {...state,suply: state.suply.filter(it=>it.id!==action.payload.id)};
        case "добрива":
            return {...state,fertilizer: state.fertilizer.filter(it=>it.id!==action.payload.id)};
        case "насіння":
            return {...state,crops: state.crops.filter(it=>it.id!==action.payload.id)};

        default:
        return {...state}

    }

}

export const updateMaterialHeandler = (material:MaterialType,state:materialsStateType):materialsStateType=>{
    //const mapShalowCopy = (arr: MaterialType[]) => arr.map(it => it.id!==material.id ? it : material)?????
    switch (material.type) {
        case "хімія":
            return {...state,chemistry:state.chemistry.map(it => it.id!==material.id ? it : material)};
        case "супутні":
            return {...state,suply: state.suply.map(it => it.id!==material.id ? it : material)};

        case "насіння":
            return {...state,crops: state.crops.map(it => it.id!==material.id ? it : material)};

        case "добрива":
            return {...state,fertilizer: state.fertilizer.map(it => it.id!==material.id ? it : material)};
        default:
            return {...state}

    }

}