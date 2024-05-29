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
                    '#ee0303',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
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
                '#05f8db',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
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
    console.log("general",ROLS[1])
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
                        <Circle key={el.lat * el.lng - i} center={[el.lat, el.lng]} pathOptions={fillBlueOptions}
                                radius={18}/>
                    )
                })}
            </MapContainer>
            <div style={
                {
                    boxShadow:"rgb(41 34 94 / 84%) -1px 0px 7px 1px",
                    color:"white",position:"absolute",
                    right:8,top:8,display:"flex",flexDirection:"column",
                    backgroundColor:"rgba(2,9,47,0.78)", padding:5,borderRadius:5
                }
            }>

                <MaterialUISwitch sx={{ m: 1 }}
                                  onChange={()=>{
                                    dispatch(setCanIDrow())}
                                  }
                                  checked={drwoingFlag} />
                <button style={{color:"red",marginTop:6}} onClick={() => {
                    setPainedPosition([]);
                }}>
                    {"Сброс точек"}
                </button>
                <button onClick={()=>{dispatch(setMaterialEditorFlag())}}>матеріали</button>
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
             <FieldParamFormPopup/>
             <TaskParamPopup/>
            {/*<MaterialParamsPopup />*/}
        </div>
    );
};
export default General_agronomist;
