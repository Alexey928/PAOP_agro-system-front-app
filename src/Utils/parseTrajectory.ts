
import {PositionType} from "../components/General_agronomist/General_agronomist";

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

export const fromCirclePositionToTrajectory = (cirklePosition:Array<PositionType>):number[][]=>{
    return cirklePosition.map((el)=>([el.lat,el.lng]))
}

