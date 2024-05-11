import React, {useEffect, useState} from 'react';
import {Circle, FeatureGroup, MapContainer, Polygon, Popup, TileLayer, useMapEvents} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import {LatLngExpression} from "leaflet"
import FormPopup from "../Common/Popup";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../BLL/Store";
import {
    selectDrowingFlag,
    selectFields,
    selectRequestProcesingStatus,
} from "../../Utils/selectors";
import {FieldType, PerimetrType, removeFieldTC, setDBstateTC} from "../../BLL/map-filds-reduser";
import {
    setCanIDrow,
    setFieldParamsPopupIsOpen, setSelectedField,
    setSelectedFieldID,
    setSelectedFieldTrajectory
} from "../../BLL/map-interfase-reduser";
import {fromCirclePositionToTrajectory} from "../../Utils/parseTrajectory";
import style from "./general-agronomist.module.css"

 export type PositionType = {
    lat: number,
    lng: number
}
const fillBlueOptions = {fillColor: 'blue'}
const defaultFieldColor = "#7bf606"
const tempBasePosition = {lat: 48.9935, lng: 36.230383};
const resSelectedFieldEntity = {id:"1",name:"",perimeters:[{sqere:""} as PerimetrType]} as FieldType

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
    const [painedPosition, setPainedPosition] = useState<Array<PositionType>>([]);
    const dispatch = useAppDispatch();
    const isRequestProcesing = useAppSelector(selectRequestProcesingStatus)
    const fields  = useAppSelector(selectFields);
    const drowingFlag = useAppSelector(selectDrowingFlag);

    useEffect(()=>{
       setTimeout(()=>dispatch(setDBstateTC()) )
        },[]
    )

    const calback = (position: PositionType | null) => {
        if (!position) return
        setPainedPosition([...painedPosition, position]);

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
                                dispatch(setSelectedFieldTrajectory(el.currentPerimeter));
                                dispatch(setCanIDrow(true));
                            }
                        }} pathOptions={{
                            color:el.fillColor ?? defaultFieldColor,
                            fillColor: el.fillColor ?? defaultFieldColor,
                        }}>
                            <Popup  className={"leaflet-popup-content-wrapper"}>
                                <header className={style.popup_header}>
                                    <div style={{color: "white", textAlign: "center",fontSize:18}}>
                                        {el.name??"Поле X Полевая Y"}  <span style={{color:"#01f6bd"}}>S = {el.perimeters.length ? el.perimeters[el.perimeters.length-1].sqere:"Не определено!"} Га</span>
                                    </div>
                                </header>
                                <hr/>
                                <div className={style.popup_body}>
                                    <FormControl  style={{width:190, marginTop:30}} >
                                            <InputLabel id="demo-simple-select-label">Виконані</InputLabel>
                                            <Select
                                                SelectDisplayProps={
                                                    {style: {
                                                            color:'#01f6bd',
                                                        }
                                                    }}
                                                value={""}
                                                color={"primary"}
                                                variant={"outlined"}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                            >
                                                <MenuItem value={""}></MenuItem>
                                                <MenuItem value={"1"}>ЗАВДАННЯ 1</MenuItem>
                                                <MenuItem value={"2"}>ЗАВДАННЯ 2</MenuItem>
                                                <MenuItem value={"3"}>ЗАВДАННЯ 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl  style={{width:190, marginTop:30}} >
                                            <InputLabel id="demo-simple-select-label">До виконання</InputLabel>
                                            <Select
                                                SelectDisplayProps={
                                                   {style: {
                                                           color:'#01f6bd',
                                                       }
                                               }}
                                                value={""}
                                                color={"primary"}
                                                variant={"outlined"}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                            >
                                                <MenuItem value={""}></MenuItem>
                                                <MenuItem value={"1"}>ЗАВДАННЯ 1</MenuItem>
                                                <MenuItem value={"2"}>ЗАВДАННЯ 2</MenuItem>
                                                <MenuItem value={"3"}>ЗАВДАННЯ 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                </div>
                                <div style={{width:"100%",display:"flex",marginTop:20, justifyContent:"space-between"}}>
                                    <Button
                                        onClick={()=>{}}
                                        size={"small"}
                                        color={"success"}
                                        variant={"contained"}>+ ЗАВДАННЯ
                                    </Button>
                                    <Button
                                        size={"small"}
                                        color={"success"}
                                            variant={"contained"}
                                            onClick={
                                        () => {
                                            dispatch(setSelectedField(el));
                                            dispatch(setFieldParamsPopupIsOpen())
                                        }
                                    }
                                    >ЗМІНИТИ</Button>
                                    <Button
                                        size={"small"}
                                        variant={"contained"}
                                            disabled={isRequestProcesing}
                                            onClick={()=>{dispatch(removeFieldTC(el.id))}}
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
                }}>
                    {"Сброс точек"}
                </button>
                <br/>
                Добавить поле
                <button
                    className={style.add_field_button}
                    style={{color:!(painedPosition.length > 2)?"rgba(82,74,101,0.92)":"rgb(8,227,1)"}}
                    disabled={!(painedPosition.length > 2)}
                    onClick={ () => {
                    setPainedPosition([]);
                    dispatch(setSelectedFieldTrajectory(fromCirclePositionToTrajectory(painedPosition)))
                    dispatch(setSelectedFieldID(""))
                    dispatch(setSelectedField(resSelectedFieldEntity));
                    dispatch(setCanIDrow(true))
                    dispatch(setFieldParamsPopupIsOpen());
                }}> +
                </button>
            </div>
             <FormPopup/>
        </div>
    );
};
export default General_agronomist;
