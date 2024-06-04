import React, {useEffect, useState} from 'react';
import {Circle, FeatureGroup, MapContainer, Polygon, Popup, TileLayer, useMapEvents} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import {LatLngExpression} from "leaflet"
import FieldParamFormPopup from "../Common/FieldParamPopup";
import {Button, FormControl, InputLabel, MenuItem, Select, styled, Switch} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../BLL/Store";
import {selectDrowingFlag, selectFields, selectRequestProcesingStatus} from "../../Utils/selectors";
import {FieldType, PerimetrType, removeFieldTC, setFieldsDBstateTC} from "../../BLL/map-filds-reduser";
import {
    setCanIDrow,
    setFieldParamsPopupIsOpen, setMaterialEditorFlag, setSelectedField,
    setSelectedFieldID,
    setSelectedFieldTrajectory, setTaskParamsPopupIsOpen
} from "../../BLL/map-interfase-reduser";
import {fromCirclePositionToTrajectory} from "../../Utils/parseTrajectory";
import style from "./general-agronomist.module.css"
import TaskParamPopup from "../Common/TaskParamPopup";
import {ROLS} from "../Registration/Registration";
import MaterialParamsPopup from "../Common/MaterialParamsPopup";

 export type PositionType = {
    lat: number,
    lng: number
}
 export const fillBlueOptions = {fillColor: 'blue'}
const defaultFieldColor = "#7bf606"
const tempBasePosition = {lat: 49.13658523465133, lng:35.60931303636023};
const resSelectedFieldEntity = {id:"1",name:"",perimeters:[{sqere:""} as PerimetrType]} as FieldType
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#20fd00',
                )}" d="M18.656.93,6.464,13.122A4.966,4.966,0,0,0,5,16.657V18a1,1,0,0,0,1,1H7.343a4.966,4.966,0,0,0,3.535-1.464L23.07,5.344a3.125,3.125,0,0,0,0-4.414A3.194,3.194,0,0,0,18.656.93Zm3,3L9.464,16.122A3.02,3.02,0,0,1,7.343,17H7v-.343a3.02,3.02,0,0,1,.878-2.121L20.07,2.344a1.148,1.148,0,0,1,1.586,0A1.123,1.123,0,0,1,21.656,3.93Z"/><path d="M23,8.979a1,1,0,0,0-1,1V15H18a3,3,0,0,0-3,3v4H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2h9.042a1,1,0,0,0,0-2H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H16.343a4.968,4.968,0,0,0,3.536-1.464l2.656-2.658A4.968,4.968,0,0,0,24,16.343V9.979A1,1,0,0,0,23,8.979ZM18.465,21.122a2.975,2.975,0,0,1-1.465.8V18a1,1,0,0,1,1-1h3.925a3.016,3.016,0,0,1-.8,1.464Z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#01264b' : '#4afc03',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#3c82f8' : '#2060a1',
        width: 32,
        height: 32,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fc232a',
            )}" d="M18.656.93,6.464,13.122A4.966,4.966,0,0,0,5,16.657V18a1,1,0,0,0,1,1H7.343a4.966,4.966,0,0,0,3.535-1.464L23.07,5.344a3.125,3.125,0,0,0,0-4.414A3.194,3.194,0,0,0,18.656.93Zm3,3L9.464,16.122A3.02,3.02,0,0,1,7.343,17H7v-.343a3.02,3.02,0,0,1,.878-2.121L20.07,2.344a1.148,1.148,0,0,1,1.586,0A1.123,1.123,0,0,1,21.656,3.93Z"/><path d="M23,8.979a1,1,0,0,0-1,1V15H18a3,3,0,0,0-3,3v4H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2h9.042a1,1,0,0,0,0-2H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H16.343a4.968,4.968,0,0,0,3.536-1.464l2.656-2.658A4.968,4.968,0,0,0,24,16.343V9.979A1,1,0,0,0,23,8.979ZM18.465,21.122a2.975,2.975,0,0,1-1.465.8V18a1,1,0,0,1,1-1h3.925a3.016,3.016,0,0,1-.8,1.464Z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#ff0000',
        borderRadius: 20 / 2,
    },
}));

 export const PointOfPoligons = (props: { calback: (position: PositionType | null) => void }) => {
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
    const drwoingFlag = useAppSelector(selectDrowingFlag);

    useEffect(()=>{
       setTimeout(()=>dispatch(setFieldsDBstateTC()))
        },[]
    )
    console.log("general",ROLS[1]);
    const calback = (position: PositionType | null) => {
        if (!position) return
        setPainedPosition([...painedPosition, position]);

    }
    return (
        <div style={{width: "100vw", height: "100vh", position: "relative"}}>
            <MapContainer center={[49.13658523465133, 35.60931303636023]} zoom={12} scrollWheelZoom={true}
                          style={{width: "100%", height: "100%", padding: 0,margin:0, zIndex: 0, cursor: "pointer"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <PointOfPoligons calback={drwoingFlag ? calback : () => {}}/>
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
                                                label={"Виконані"}
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
                                                label={"До виконання"}
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
                                        onClick={()=>{dispatch(setTaskParamsPopupIsOpen())}}
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
                                            dispatch(setFieldParamsPopupIsOpen());
                                            dispatch(setCanIDrow(true))
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
                        <Circle key={el.lat * el.lng + i*el.lng} center={[el.lat, el.lng]} pathOptions={fillBlueOptions}
                                radius={18}/>
                    )
                })}
            </MapContainer>
            <div style={
                {
                    boxShadow:"rgb(41 34 94 / 84%) -1px 0px 7px 1px",
                    color:"white",position:"absolute",
                    right:8,top:8,display:"flex",flexDirection:"column",width:145,
                    backgroundColor:"rgba(2,9,47,0.78)", padding:5,borderRadius:5
                }
            }>
              <div style={{width:"100%"}}>
                  <MaterialUISwitch sx={{ m: 1 }}
                                    onChange={()=>{
                                        dispatch(setCanIDrow());setPainedPosition([])}
                                    }
                                    checked={drwoingFlag} />
                  <Button size={"small"} style={{display:"inline-block",width:50,color:painedPosition.length?"#7bf606":"white",fontWeight:painedPosition.length?"bold":"normal"}}

                          variant={"contained"}
                          color={painedPosition.length?"secondary":"primary"}
                          onClick={() => {
                      setPainedPosition([]);
                  }}>
                      {"Скид"}
                  </Button>
              </div>
                <hr style={{width:"100%"}}/>
                {drwoingFlag && <div>
                    <Button  variant={"contained"} onClick={()=>{dispatch(setMaterialEditorFlag())}}>матеріали</Button>
                    <hr style={{width:"100%"}}/>

                    <Button
                        color={(painedPosition.length > 2)?"success":"error"}
                        variant={"contained"}
                        style={{color:(painedPosition.length > 2)?"#03fcd7":"white"}}
                        onClick={ () => {
                            if(!(painedPosition.length > 2)) return
                            setPainedPosition([]);
                            dispatch(setSelectedFieldTrajectory(fromCirclePositionToTrajectory(painedPosition)))
                            dispatch(setSelectedFieldID(""))
                            dispatch(setSelectedField(resSelectedFieldEntity));
                            dispatch(setCanIDrow(true))
                            dispatch(setFieldParamsPopupIsOpen());
                        }}> + Поле
                    </Button>
                </div>}

            </div>
             <FieldParamFormPopup/>
             <TaskParamPopup/>
            <MaterialParamsPopup />
        </div>
    );
};
export default General_agronomist;
