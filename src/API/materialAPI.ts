import {instance} from "./commonApiInstanse";
import {MaterialType} from "../BLL/material-reducer";

export const materialAPI = {
    getAll() {
        return instance.get<Array<MaterialType>>("/materials");
    },
    createMaterial(){
        return instance.post("materials",{})
    }
}