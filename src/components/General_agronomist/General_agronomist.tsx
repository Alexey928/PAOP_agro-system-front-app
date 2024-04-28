import React, {useEffect, useState} from 'react';
import {Circle, FeatureGroup, MapContainer, Polygon, Popup, TileLayer, useMapEvents} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import {LatLngExpression} from "leaflet"
import FormPopup from "../Common/Popup";
import {useFields} from "./hooks/useFields";
import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../BLL/Store";
import {selectDrowingFlag, selectFields, selectSelectedFieldID} from "../../Utils/selectors";
import {setDBstateTC} from "../../BLL/map-filds-reduser";
import {
    setCanIDrow,
    setFieldParamsPopupIsOpen,
    setSelectedFieldID,
    setSelectedFieldTrajectory
} from "../../BLL/map-interfase-reduser";
import {fromCirclePositionToTrajectory} from "../../Utils/parseTrajectory";

 export type PositionType = {
    lat: number,
    lng: number
}


const fillBlueOptions = {fillColor: 'blue'}
const limeOptions = {color: '#4bff04', fillColor: "rgb(9,250,176)"}
const tempBasePosition = {lat: 48.9935, lng: 36.230383};

const PointOfPoligons = (props: { calback: (position: PositionType | null) => void }) => {
    const map = useMapEvents({
        click(e) {
            props.calback(e.latlng)
            console.log(e)
        },
        dblclick(e) {

            map.flyTo(tempBasePosition, map.getZoom())
        },
        zoom(e) {
            console.log(e, "zoom was changed ")
        },
        dragend(e) {
            console.log("dragend -->", e.target._pixelOrigin)
        },
    })
    return null
}
const General_agronomist = () => {
    const {setNewField,deleteField,setThoisedFieldID} = useFields()
    const [painedPosition, setPainedPosition] = useState<Array<PositionType>>([]);
    const dispatch = useAppDispatch();

    const fields  = useAppSelector(selectFields);
    const drowingFlag = useAppSelector(selectDrowingFlag);

    useEffect(()=>{
       setTimeout(()=>dispatch(setDBstateTC()) )
        },[]
    )

    const calback = (position: PositionType | null) => {
        if (!position) return
        setPainedPosition([...painedPosition, position])
        console.log(painedPosition);
    }

    const addPoligon = () => {
        if (painedPosition.length > 2) {
            const tempPaligon: number[][] = [];
            painedPosition.forEach((el, i) => {
                tempPaligon.push([el.lat, el.lng]);
            })
            setNewField(tempPaligon)
            setPainedPosition([]);

        }
    }
    return (
        <div style={{width: "100vw", height: "100vh", position: "relative"}}>
            <MapContainer center={[49.9935, 36.230383]} zoom={10} scrollWheelZoom={true}
                          style={{width: "100%", height: "100%", padding: 0,margin:0, zIndex: 0, cursor: "pointer"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <PointOfPoligons calback={drowingFlag ? calback : () => {}}/>
                {fields.map((el, i) => {
                    return (
                        <FeatureGroup key={el.id} eventHandlers={{
                            click: () => {
                                dispatch(setSelectedFieldID(el.id));
                                dispatch(setSelectedFieldTrajectory(fromCirclePositionToTrajectory(painedPosition)));
                                setThoisedFieldID(el.id)
                                console.log(el.name);
                            }
                        }} pathOptions={limeOptions}>
                            <Popup  className={"leaflet-popup-content-wrapper"}>
                                <div style={{color: "blue", height: 300, backgroundColor: "#010a28", width: 280}}>
                                    <header style={{width: "100%", backgroundColor: "salmon"}}>
                                        <div style={{color: "white", textAlign: "center"}}>
                                            {el.name??"Поле X Полевая Y"} S = {el.description??"?"}
                                        </div>
                                    </header>
                                    <div style={{}}>
                                        <ul style={{
                                            listStyle: "none",
                                            padding: 0,
                                            color: "white",
                                            width: "100%",
                                            height: "100%"
                                        }}>
                                            <li><span>культура - </span></li>
                                            <li><span>посев : 25,03,2024 р </span></li>
                                            <li><span>Обработка почв : 3 --</span></li>
                                            <li><span>Внесение Удобрений :</span></li>
                                            <li><span>Уборка : Дата </span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div style={{width:"100%",display:"flex",justifyContent:"space-around",marginTop:20}}>
                                    <Button color={"success"}
                                            variant={"contained"}
                                            onClick={() => dispatch(setFieldParamsPopupIsOpen())}
                                    >+ ЗАВДАННЯ</Button>
                                    <Button variant={"contained"}
                                            onClick={()=>{deleteField(el.id)}}
                                            color={"error"}
                                    >ВИДАЛИТИ</Button>
                                </div>
                            </Popup>
                            <Polygon  positions={el.currentPerimeter as LatLngExpression[]}/>
                        </FeatureGroup>
                    )
                })}
                {painedPosition.map((el, i) => {
                    return (
                        <Circle key={el.lat * el.lng - i} center={[el.lat, el.lng]} pathOptions={fillBlueOptions}
                                radius={18}/>
                    )
                })}
            </MapContainer>

            <div style={
                {
                    boxShadow:"rgb(41 34 94 / 84%) -1px 0px 7px 1px",
                    color:"white",position:"absolute" ,
                    right:8,top:8,display:"flex",flexDirection:"column",
                    backgroundColor:"rgba(2,9,47,0.78)", padding:5,borderRadius:5
                }
            }>
                Рисовать поле {" "}
                <input onChange={() => {
                    dispatch(setCanIDrow())
                }} type={"checkbox"} checked={drowingFlag}/>
                <button style={{color:"red",marginTop:6}} onClick={() => {
                    setPainedPosition([]);
                    console.log("rrr");
                }}>
                    {"Сброс точек"}
                </button>
                <br/>
                Добавить поле
                <button style={{fontSize:25,padding:0,color:!(painedPosition.length > 2)?"rgba(82,74,101,0.92)":"rgb(8,227,1)",fontWeight:"bold"}} disabled={!(painedPosition.length > 2)} onClick={() => {
                    addPoligon();
                    dispatch(setFieldParamsPopupIsOpen());
                    dispatch(setSelectedFieldTrajectory(fromCirclePositionToTrajectory(painedPosition)))
                }}> +
                </button>
            </div>
             <FormPopup
                 // setFieldParams={setFieldParams}
             />

        </div>
    );
};
export default General_agronomist;
