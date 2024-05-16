import React, {useState} from 'react';
import {Circle, FeatureGroup, MapContainer, Polygon, TileLayer} from "react-leaflet";
import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../BLL/Store";
import {selectDrowingFlag, selectSelectedFieldTrajectory} from "../../../Utils/selectors";
import {LatLngExpression} from "leaflet";
import {fillBlueOptions, PointOfPoligons, PositionType} from "../../General_agronomist/General_agronomist";

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
    const [painedPosition, setPainedPosition] = useState<Array<PositionType>>([]);
    const drowingFlag = useAppSelector(selectDrowingFlag);
    const dispatch = useAppDispatch();


    const calback = (position: PositionType | null) => {
        if (!position) return
        setPainedPosition([...painedPosition, position]);

    }

    return (
        <div style={{width: 500, height: 300, position: "relative"}}>
            <MapContainer center={findCenter(selectedTraiectory) as LatLngExpression} zoom={13} scrollWheelZoom = {true}
                          style={{width: "100%", height: "100%", padding: 0,margin:0, zIndex: 0, cursor: "pointer"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <PointOfPoligons calback={drowingFlag ? calback : () => {}}/>
                <FeatureGroup
                    pathOptions={{
                    color:"#00020e",
                    fillColor: "#00020e",
                }}>
                    <Polygon  positions={selectedTraiectory as LatLngExpression[]}/>
                </FeatureGroup>
                {painedPosition.map((el, i) => {
                    return (
                        <Circle key={el.lat * el.lng - i} center={[el.lat, el.lng]} pathOptions={fillBlueOptions}
                                radius={18}/>
                    )
                })}
            </MapContainer>
            <div   style={{ position:"absolute", zIndex:10, top:5, right:5}}>
                <Button variant={"contained"} onClick={()=>{setNewTrajectory([[]])}}> OK </Button>
            </div>
            <div   style={{ position:"absolute", zIndex:10, top:45, right:5}}>
                <Button variant={"contained"} onClick={()=>{setNewTrajectory([[]])}}> RES </Button>
            </div>

        </div>
    );
};

export default FieldDemonstrateAndEdition;