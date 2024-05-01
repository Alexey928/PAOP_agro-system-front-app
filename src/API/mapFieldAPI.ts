import {FieldType, mapFieldStateType, PerimetrType} from "../BLL/map-filds-reduser";
import {instance} from "./commonApiInstanse";

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
                fillColor:"#fffff",
                currentPerimeter:[[]]
            }
        )

    },
    createFieldPerimetr(fieldId:string,trajectory:string,sqere:string){
        debugger
        return instance.post<PerimetrType>("/ifield-perimetr",{fieldId,sqere,trajectory});

        // return ({
        //     id:"1",
        //     squre:"555",
        //     trajectory:'{"0":{"lat":4,"lang":5},"1":{"lat":8,"lang":9}}',
        //     validFrom: new Date()// !!!!!!
        // })
    }
}
