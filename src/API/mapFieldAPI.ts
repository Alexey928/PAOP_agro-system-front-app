import {FieldType, mapFieldStateType, PerimetrType} from "../BLL/map-filds-reduser";
import {instance} from "./commonApiInstanse";

export type fieldDTOType = {
    id:string
    name:string
    description:string
    perimeters:PerimetrType[]
}
export const mapFieldAPI = {
    create(name:string,description:string){
        return instance.post<fieldDTOType>("/fields");
    },
    updateFieldData(id:string,name:string,description:string):FieldType{
        return {
            id:"1",
            name:"some name",
            description:"some description",
            perimeters:[],
            currentPerimeter:[[]]

        }
    },
    getAll(){
        return instance.get<Array<fieldDTOType>>("/fields");
    },
    getOne(id:string):FieldType{
        return (
            {
                id:"1",
                name:"some name",
                description:"some description",
                perimeters:[],
                currentPerimeter:[[]]
            }
        )

    },
    createFieldPerimetr(fieldID:string,trajectory:string,sqere:string):PerimetrType{
        return ({
            id:"1",
            squre:"555",
            trajectory:"{'0':{lat:4,lang:5},'1':{lat:8,lang:9}}",
            validFrom: new Date()// !!!!!!
        })
    }
}
