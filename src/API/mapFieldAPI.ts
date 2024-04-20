import {instance} from "./commonApiInstanse";

export const mapFieldAPI = {
    create(){
        return {id:"1"}
    },
    getAll(){
        return {id:"1",description:"sss",name:"sss1",perimetrs:{id:"1",squere:"55"}}
    },
    getOne(id:string){

    },
    createFieldPerimetr(fieldID:string,trajectory:string){
        return {id:"2"}
    }
}
