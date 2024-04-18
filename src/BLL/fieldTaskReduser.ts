export type MaterialType = {
    id:string
    name:string
    type:string
}

export type FildTaskTtype = {
[fieldID:string]:[
        {
            id:string
            type:string
            status:"isDone"|"inProgress"
            materials:MaterialType[]
        }
    ]
}


export const fieldTaskReduser = ()=>{

}