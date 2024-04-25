import {FieldType, mapFieldStateType, PerimetrType} from "../BLL/map-filds-reduser";
import {instance} from "./commonApiInstanse";
import {User} from "./AuthApi";
export const mapFieldAPI = {
    create(name:string,description:string):FieldType{
        return {
            field:{
                id:"1",
                name:"some name",
                description:"some description"
            },
            allPerimeters:[],
            currentPerimeter:[[]]

        }
    },
    updateFieldData(id:string,name:string,description:string):FieldType{
        return {
            field:{
                id:"1",
                name:"some name",
                description:"some description"
            },
            allPerimeters:[],
            currentPerimeter:[[]]

        }
    },
    getAll(){
        return   instance.get<mapFieldStateType>("/fields");
        // return [{
        //     field:{
        //         id:"1",
        //         name:"some name",
        //         description:"some description"
        //     },
        //     allPerimeters:[],
        //     currentPerimeter:[[]]
        //
        // }]
    },
    getOne(id:string):FieldType{
        return (
            {
                field:{
                    id:"1",
                    name:"some name",
                    description:"some description"
                },
                allPerimeters:[],
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
