import {AppRootStateType} from "./Store";

import {MaterialType} from "./material-reducer";
export type MaterialTaskDTOType = {
    currentAmount:number | null,
    material : MaterialType,
    unnesesuryWater:number
}

type TascMaterialStateType  = {
    edetTaskcs:MaterialTaskDTOType[];
    tascks:{[key:string]:{form:Date,to:Date,}[]}
}

export const fieldTaskReduser = (state:AppRootStateType,action:any)=>{
    switch (action) {

    }

}