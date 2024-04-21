import {instance} from "./commonApiInstanse";
import {PerimetrType} from "../BLL/filds-reduser";


export const mapFieldAPI = {
    create(){
        return {id:"1"}
    },
    getAll(){
        return {
            field:{
                id:"1",
                name:"some name",
                description:"some description"
            },
            allPerimeters:[],
            currentPerimetr:[[]]

        }
    },
    getOne(id:string){

    },
    createFieldPerimetr(fieldID:string,trajectory:string){
        return {id:"2"}
    }
}
