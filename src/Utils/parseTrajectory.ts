
export type Trajecktory = {
    [key:string]:{
                    lat:number,
                    lang:number
                }
}

export const parseTrajektory = (trajektory:string):number[][]=>{
    const tempTrajectory:Trajecktory = JSON.parse(trajektory);
    const result:number[][]=[];
    for( let key in tempTrajectory){
        result.push([tempTrajectory[key].lat,tempTrajectory[key].lang])
    }
    return result
}
export const trajectoryToDTOstring = (trajectory:number[][]):string=>{
    const tr:Trajecktory={}
    trajectory.forEach((item,index)=>{
        tr[`${index}`] = {lat:item[0],lang:item[1]}
    })
    return JSON.stringify(tr)
}

