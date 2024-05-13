
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

const isEquleTrajectory = (trajectory_1:number[][],trajectory_2:number[][]):boolean => {
    if(trajectory_1.length !== trajectory_2.length) return false;
    let result:boolean = true;
    trajectory_1.forEach((it,i) => {
        if(it[0]!==trajectory_2[i][0] || it[1]!==trajectory_2[i][1]) result = false
    })
    return result
}

