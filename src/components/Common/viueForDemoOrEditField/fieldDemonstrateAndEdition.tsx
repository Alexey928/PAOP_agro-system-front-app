import React from 'react';
import {MapContainer, TileLayer} from "react-leaflet";
import {Button} from "@mui/material";
import {useAppSelector} from "../../../BLL/Store";
import {selectSelectedFieldTrajectory} from "../../../Utils/selectors";
import {LatLngExpression} from "leaflet";

type FieldDemoPropsType = {
    setNewTrajectory:(trajectory:number[][])=>void
}
const findCenter = (tragectory:number[][]):number[]=>{
    let hightLat = 0
    let hightLang = 0
    tragectory.forEach((it)=>{
        if(it[0]>hightLat) hightLat = it[0]
        if(it[1]>hightLang) hightLang = it[1]
    })
    return [hightLat,hightLang];
}

const FieldDemonstrateAndEdition:React.FC<FieldDemoPropsType> = ({setNewTrajectory}) => {
    const selectedTraiectory = useAppSelector(selectSelectedFieldTrajectory);

    return (
        <div style={{width: 500, height: 300, position: "relative"}}>
            <MapContainer center={findCenter(selectedTraiectory) as LatLngExpression} zoom={12} scrollWheelZoom = {true}
                          style={{width: "100%", height: "100%", padding: 0,margin:0, zIndex: 0, cursor: "pointer"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
            <div   style={{ position:"absolute", zIndex:1000, top:0, left:50}}>
                <Button variant={"contained"} onClick={()=>{setNewTrajectory([[]])}}> OK </Button>
            </div>

        </div>
    );
};

export default FieldDemonstrateAndEdition;