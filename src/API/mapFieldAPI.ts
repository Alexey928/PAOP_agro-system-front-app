import {FieldType, PerimetrType} from "../BLL/map-filds-reduser";
import {instance} from "./commonApiInstanse";
import {LastRemoved} from "../BLL/map-interfase-reduser";

export type fieldDTOType = {
    id:string
    name:string
    description:string
    perimeters:PerimetrType[]
    fillColor:string
}
export const mapFieldAPI = {
    create(name:string,description:string){
        return instance.post<fieldDTOType>("/fields",{name,description});
    },
    updateFieldData(id:string,name:string,description:string):FieldType{
        return {
            id:"1",
            name:"some name",
            description:"some description",
            perimeters:[],
            fillColor:"#fffff",
            currentPerimeter:[[]]
        }
    },
    removeFieldFromDB(fieldId:string){
        return instance.delete<LastRemoved>(`/fields/${fieldId}`)
        },
    getAll(){
        return instance.get<Array<fieldDTOType>>("/fields");
    },

    createFieldPerimetr(fieldId:string,trajectory:string,sqere:string){
        debugger
        return instance.post<PerimetrType>("/ifield-perimetr",{fieldId,sqere,trajectory});
    }
}
