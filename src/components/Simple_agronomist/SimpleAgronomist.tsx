import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../BLL/Store";
import {selectFields, selectFlagForDescription, selectTaskMaterials} from "../../Utils/selectors";
import {setFieldsDBstateTC} from "../../BLL/map-filds-reduser";
import {FeatureGroup, MapContainer, Polygon, Popup, TileLayer, Tooltip} from "react-leaflet";
import {LatLngExpression} from "leaflet";
import style from "../General_agronomist/general-agronomist.module.css";
import {SwitchTextTrackk} from "../Common/MaterialUISwithes/switches"
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {TypesOfTask} from "../Common/Forms/TaskParamForm";
import {authMeTC} from "../../BLL/auth-reduser";
import {setTokenInInstanse} from "../../API/commonApiInstanse";
import {setShowFieldDescription} from "../../BLL/map-interfase-reduser";

const defaultFieldColor = "#7bf606"

const SimpleAgronomist = () => {
    const tasks = useAppSelector(selectTaskMaterials)
    const fields  = useAppSelector(selectFields);
    const descriptionFlag =useAppSelector(selectFlagForDescription)
    const dispatch = useAppDispatch();
    console.log(tasks,fields)
    const [state, setState] = useState({
        gilad: true,
        jason: false,
        antoine: true,
    });
    const handleChange = () => {
        setTokenInInstanse();
        dispatch(authMeTC())
    };

    useEffect(()=>{
            setTimeout(()=>dispatch(setFieldsDBstateTC()))
        },[]
    )
    return (
        <div style={{color:"white",width: "100vw", height: "100vh", position: "relative"}}>
            <div style={
                {   position:"absolute",right:8,top:4,
                    boxShadow:"rgb(41 34 94 / 84%) -1px 0px 7px 1px",borderRadius:5,
                    width:145,height:165,backgroundColor:"#012057",zIndex:1,
                    display:"flex",flexDirection:"column",
                }
            }>
            <div>
                <SwitchTextTrackk onChange={()=>{dispatch(setShowFieldDescription())}}/>
                <Button onClick={handleChange} variant={"contained"}>{"-->"}</Button>
            </div>


            </div>
            <MapContainer center={[49.13658523465133, 35.60931303636023]} zoom={12} scrollWheelZoom={true}
                          style={{width: "100%", height: "100%", padding: 0,margin:0, zIndex: 0, cursor: "pointer"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {fields.map((el) => {
                    return (
                        <div>
                            {el.currentPerimeter.length &&
                                <FeatureGroup key={el.id}  pathOptions={{
                                    color:el.fillColor ?? defaultFieldColor,
                                    fillColor: el.fillColor ?? defaultFieldColor,
                                }} >
                                    <Polygon  positions={el.currentPerimeter as LatLngExpression[]}>
                                        {descriptionFlag && <Tooltip  permanent direction="center" className={style.polygonTooltip}>
                                            <div style={{width:"100%", height:"100%",color:"black",position:"relative"}}>
                                                <div>{el.name ? `${el.name}` : "Нет данных"}</div>
                                                <div>{`S = ${el.perimeters.length ? el.perimeters[el.perimeters.length-1].sqere : 
                                                        "Не определено!"} Га`}
                                                </div>
                                                <span>{`Культура: ${el.currentCultures[0].culture}`}</span>
                                                {tasks[el.id]&&<span style={{
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
                                        </Tooltip>}
                                    </Polygon>

                                    <Popup
                                        closeButton={false}  className={"leaflet-popup-content-wrapper"}>
                                        <header className={style.popup_header}>
                                            <div style={{color: "white", textAlign: "center",fontSize:18}}>
                                                {el.name??"Поле X Полевая Y"}  <span style={{color:"#01f6bd"}}>S = {el.perimeters.length ? el.perimeters[el.perimeters.length-1].sqere:"Не определено!"} Га</span>
                                            </div>
                                        </header>
                                        <hr/>
                                        <div className={style.popup_body} style={{height:120}}>
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
                                                    {tasks[el.id] ?
                                                        tasks[el.id].map((el)=>(
                                                            <MenuItem onClick={(event)=>{
                                                                console.log(event.target,el);


                                                            }} style={
                                                                {
                                                                    display:"flex",
                                                                    justifyContent:"space-between",
                                                                    backgroundColor:"#bda7e7"
                                                                }
                                                            }
                                                                      value={el.type}>
                                                                {TypesOfTask[+el.type]}
                                                            </MenuItem>))  :
                                                        <MenuItem value={""}></MenuItem>
                                                    }
                                                </Select>
                                            </FormControl>
                                        </div>

                                    </Popup>
                                </FeatureGroup>
                            }
                        </div>
                    )})}
            </MapContainer>
        </div>)
};

export default SimpleAgronomist;