import {AppRootStateType} from "./Store";
import {MaterialType} from "./material-reducer";


export type MaterialTaskDTOItemType = {
    currentAmount:number | null,
    material : MaterialType,
    unnesesuryWater:number
}

type CreateTasckDTOType ={

}

type TascMaterialStateType  = {
    edetTaskcs:MaterialTaskDTOItemType[];
    tascks:{[key:string]:{form:Date,to:Date,}[]}
}

export const fieldTaskReduser = (state:AppRootStateType,action:any)=>{
    switch (action) {

    }

}