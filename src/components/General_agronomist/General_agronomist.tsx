import React, {useEffect, useState} from 'react';
import {Circle, FeatureGroup, MapContainer, Polygon, Popup, TileLayer, Tooltip, useMapEvents} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import {DomEvent, LatLngExpression} from "leaflet"
import FieldParamFormPopup from "../Common/FieldParamPopup";
import {Button, FormControl, InputLabel, MenuItem, Select, styled, Switch} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';


import {useAppDispatch, useAppSelector} from "../../BLL/Store";

import {
    selectDrowingFlag,
    selectFields, selectFlagForMapInfo,
    selectRequestProcesingStatus,
    selectTaskMaterials
} from "../../Utils/selectors";
import {FieldType, PerimetrType, removeFieldTC, setFieldsDBstateTC} from "../../BLL/map-filds-reduser";
import {
    setCanIDrow, setFieldInfoFlag,
    setFieldParamsPopupIsOpen, setFullReportPopupFlag, setMaterialEditorFlag, setSelectedField,
    setSelectedFieldID,
    setSelectedFieldTrajectory, setShowCartInfo, setTaskParamsPopupIsOpen, setTaskViueIndeficatorData
} from "../../BLL/map-interfase-reduser";
import {fromCirclePositionToTrajectory} from "../../Utils/parseTrajectory";
import style from "./general-agronomist.module.css"
import MaterialParamsPopupContayner from "../Common/MaterialParamsPopupContayner";
import TaskParamPopup from "../Common/TaskParamPopup";
import {taskTypeConvertEmun} from "../Common/Forms/TaskParamForm";
import {SwitchDrovingFlag, SwitchMapInfoFlag} from "../Common/MaterialUISwithes/switches"
import TaskVuiePopup from "../Common/tascViue/TaskViueuPopup";
import {removeTaskFromDB} from "../../BLL/fieldTaskReduser";
import zIndex from "@mui/material/styles/zIndex";
import stopPropagation = DomEvent.stopPropagation;
import FieldInformationPopup from "../Common/FieldInformationPopup/FieldInformationPopup";
import FullReportContainer from "../Common/FullreportPopup/FullReportContainer";

 export type PositionType = {
    lat: number,
    lng: number
}

export const fillBlueOptions = {fillColor: 'blue'}
const defaultFieldColor = "#7bf606"
const tempBasePosition = {lat: 49.13658523465133, lng:35.60931303636023};
const resSelectedFieldEntity = {id:"1",name:"",perimeters:[{sqere:""} as PerimetrType]} as FieldType

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
    const isRequestProcesing = useAppSelector(selectRequestProcesingStatus);
    const tasks = useAppSelector(selectTaskMaterials)
    const fields  = useAppSelector(selectFields);
    const drowingFlag = useAppSelector(selectDrowingFlag);
    const fieldInfoFlag = useAppSelector(selectFlagForMapInfo)
    useEffect(()=>{
       setTimeout(()=>dispatch(setFieldsDBstateTC()))
        },[]
    )
    console.log(tasks);
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
                <PointOfPoligons calback={drowingFlag ? calback : () => {}}/>
                {fields.map((el, i) => {
                    const fildID = el.id;
                    return (
                        <FeatureGroup key={el.id} eventHandlers={{
                                click: () => {
                                    dispatch(setSelectedFieldID(el.id));
                                    dispatch(setSelectedFieldTrajectory(el.currentPerimeter));
                                    dispatch(setCanIDrow(true));
                                    dispatch(setSelectedField(el))
                                }
                            }}
                                pathOptions={{
                                color:el.fillColor ?? defaultFieldColor,
                                fillColor: el.fillColor ?? defaultFieldColor,
                            }}>
                            { <Popup
                               closeButton={false}  className={"leaflet-popup-content-wrapper"}>
                                <header className={style.popup_header}>
                                    <div style={{color: "white", textAlign: "center",fontSize:18}}>
                                        {el.name??"Поле X Полевая Y"}  <span style={{color:"#01f6bd"}}>S = {el.perimeters.length ? el.perimeters[el.perimeters.length-1].sqere:"Не определено!"} Га</span>
                                    </div>
                                </header>
                                <hr/>
                                <div className={style.popup_body}>
                                    {/*<FormControl  style={{width:190, marginTop:30}} >*/}
                                    {/*        <InputLabel id="demo-simple-select-label">Виконані</InputLabel>*/}
                                    {/*        <Select*/}
                                    {/*            SelectDisplayProps={*/}
                                    {/*                {style: {*/}
                                    {/*                        color:'#01f6bd',*/}
                                    {/*                    }*/}
                                    {/*                }}*/}
                                    {/*            label={"Виконані"}*/}
                                    {/*            value={""}*/}
                                    {/*            color={"primary"}*/}
                                    {/*            variant={"outlined"}*/}
                                    {/*            labelId="demo-simple-select-label"*/}
                                    {/*            id="demo-simple-select"*/}
                                    {/*        >*/}

                                    {/*            <MenuItem value={""}></MenuItem>*/}
                                    {/*        </Select>*/}
                                    {/*    </FormControl>*/}
                                        <FormControl  style={{width:190, marginTop:30}} >
                                            <InputLabel id="demo-simple-select-label">До виконання</InputLabel>
                                            <Select
                                                onChange={(event)=>{
                                                    console.log(event.target.value)
                                                    dispatch(setTaskViueIndeficatorData({flag:true,taskFieldId:fildID,taskId:event.target.value}))// target value, as selected task id
                                                }}
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
                                                {tasks[el.id]?
                                                    tasks[el.id].map((el)=>(
                                                    <MenuItem style={
                                                        {
                                                        display:"flex",
                                                        justifyContent:"space-between",
                                                        backgroundColor:"#bda7e7"
                                                        }
                                                    }
                                                    value={el.id}>
                                                        {taskTypeConvertEmun[+el.type].toUpperCase()}
                                                        <Button onClick={(e)=>{
                                                            e.stopPropagation();
                                                            debugger
                                                            dispatch(removeTaskFromDB(el.id));
                                                        }}
                                                                variant={"contained"}
                                                                color={"error"}
                                                                size={"small"}>
                                                            x
                                                        </Button>
                                                    </MenuItem>)):
                                                    <MenuItem value={""}></MenuItem>
                                                }
                                            </Select>
                                        </FormControl>
                                </div>
                                <div style={{width:"100%",display:"flex",marginTop:20, justifyContent:"space-between"}}>
                                    <Button
                                        onClick={()=>{dispatch(setTaskParamsPopupIsOpen());}}
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
                            </Popup>}
                            {el.currentPerimeter.length &&
                                <Polygon   positions={el.currentPerimeter as LatLngExpression[]}>
                                    {fieldInfoFlag &&
                                        <Tooltip interactive={true}   permanent direction="center" className={style.polygonTooltip}>
                                            <div style={{width:"100%", height:"100%",color:"black"}}>
                                                <div>{el.name ? `${el.name}` : "Нет данных"}</div>
                                                <div>
                                                {
                                                    `S = ${el.perimeters.length ? 
                                                        el.perimeters[el.perimeters.length-1].sqere :
                                                    "Не определено!"} Га`
                                                }
                                            </div>
                                                <span>{`Культура: ${el.currentCultures[0].culture}`}</span>
                                                {tasks[el.id] && <span style={{
                                                    top:-17,
                                                    right:-16,
                                                    width:20,
                                                    backgroundColor:"red",
                                                    color:"white",
                                                    position:"absolute",
                                                    border:"1px solid blue",
                                                    borderRadius:30,
                                                }}>!</span>}
                                            </div>
                                            <hr color={"black"}/>
                                            <div style={{zIndex:20}}>
                                                <Button size={"small"} variant={"contained"} color={"primary"}
                                                        onClick={(event)=>{
                                                            event.stopPropagation();
                                                            alert(el.name);
                                                            dispatch(setFieldInfoFlag({flag:true,fieldId:el.id}))
                                                        }

                                                }>

                                                                <QueryStatsOutlinedIcon/>
                                                </Button>
                                            </div>
                                        </Tooltip>
                                    }
                                </Polygon>
                            }
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
                    right:8,top:8,display:"flex",flexDirection:"column",width:185,
                    backgroundColor:"rgba(2,9,47,0.78)", padding:5,borderRadius:5
                }
            }>
              <div style={{width:"100%"}}>

                  <SwitchMapInfoFlag sx={{ m: 1 }}
                                     onChange={()=>{
                                         dispatch(setShowCartInfo());
                                         setPainedPosition([])
                                     }
                                     }
                                     checked={fieldInfoFlag} />
                  <SwitchDrovingFlag sx={{ m: 1 }}
                                     onChange={()=>{
                                         dispatch(setCanIDrow());
                                         setPainedPosition([])
                                     }
                                     }
                                     checked={drowingFlag} />
                  <Button size={"small"} style={{display:"inline-block",width:50,color:painedPosition.length?"#7bf606":"white",fontWeight:painedPosition.length?"bold":"normal"}}
                          variant={"contained"}
                          color={painedPosition.length?"success":"primary"}
                          onClick={() => {
                      setPainedPosition((prevState)=>{
                          const temp = [...prevState];
                          temp.pop();
                          return temp;
                      });
                  }}>
                      <ArrowBackIcon  color={drowingFlag?"error":"disabled"}/>

                  </Button>
                  <Button color={drowingFlag?"error":"primary"} onClick={()=>{setPainedPosition([])}}>
                      <DeleteIcon/>
                  </Button>
              </div>
                <hr style={{width:"100%"}}/>
                { drowingFlag ? <div>
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
                </div>:
                    <div>
                        <Button size={"small"} variant={"contained"} onClick={()=>{dispatch(setFullReportPopupFlag())}}>
                            повний звіт
                        </Button>
                    </div>}
            </div>
            <FieldParamFormPopup/>
            <TaskParamPopup/>
            <MaterialParamsPopupContayner/>
            <TaskVuiePopup/>
            <FieldInformationPopup fields={fields}/>
            <FullReportContainer />
        </div>
    );
};
export default General_agronomist;
