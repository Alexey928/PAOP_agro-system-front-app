import React, {useEffect, useState} from 'react';
import {Circle, FeatureGroup, MapContainer, Polygon, TileLayer} from "react-leaflet";
import {Button, useMediaQuery} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../BLL/Store";
import {selectSelectedFieldTrajectory} from "../../../Utils/selectors";
import {LatLngExpression} from "leaflet";
import {fillBlueOptions, PointOfPoligons, PositionType} from "../../General_agronomist/General_agronomist";
import {fromCirclePositionToTrajectory} from "../../../Utils/parseTrajectory";

type FieldDemoPropsType = {
    setNewTrajectory:(trajectory:number[][])=>void
}
const findCenter = (tragectory:number[][]):number[]=>{
    let hightLat = 0;
    let hightLang = 0;
    tragectory.forEach((it)=>{
        if(it[0]>hightLat) hightLat = it[0];
        if(it[1]>hightLang) hightLang = it[1];
    })
    return [hightLat,hightLang];
}

const FieldDemonstrateAndEdition:React.FC<FieldDemoPropsType> = ({setNewTrajectory}) => {
    const selectedTraiectory = useAppSelector(selectSelectedFieldTrajectory);
    const [painedPosition, setPainedPosition] = useState<Array<PositionType>>([]);
    const matches = useMediaQuery('(min-width:900px)');

    const dispatch = useAppDispatch();

    const calback = (position: PositionType | null) => {
        if (!position) return
        setPainedPosition([...painedPosition, position]);
    }
    const editFieldHandler = ()=>{
        if(painedPosition.length<3) {
            window.alert("некоректна траекторія або ви не змінили її взвгвлі. Периметер буде повернуто до початкового значення");
            setNewTrajectory(selectedTraiectory);
            return
        }
        setNewTrajectory(fromCirclePositionToTrajectory(painedPosition));

    }

    return (
        <div style={{width: 500, height: 300, position: "relative"}}>
            <MapContainer center={findCenter(selectedTraiectory) as LatLngExpression} zoom={13} scrollWheelZoom = {true}
                          style={{width: "100%", height: "100%", padding: 0,margin:0, zIndex: 0, cursor: "pointer"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <PointOfPoligons calback={calback}/>
                <FeatureGroup
                    pathOptions={{
                    color: "#00020e",
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
            <div   style={{ position:"absolute", zIndex:10, top:5, right:matches?5:65}}>
                <Button variant={"contained"}
                        onClick={editFieldHandler}> OK </Button>
            </div>
            <div   style={{ position:"absolute", zIndex:10, top:45, right:matches?5:65}}>
                <Button variant={"contained"} onClick={()=>{setPainedPosition([])}}>
                    RES
                </Button>
            </div>

        </div>
    );
};
export default FieldDemonstrateAndEdition;