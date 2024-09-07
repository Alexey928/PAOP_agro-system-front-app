import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../BLL/Store";
import {selectFields, selectTaskMaterials} from "../../Utils/selectors";
import {setFieldsDBstateTC} from "../../BLL/map-filds-reduser";
import {MapContainer, Polygon, TileLayer, Tooltip} from "react-leaflet";
import {LatLngExpression} from "leaflet";
import style from "../General_agronomist/general-agronomist.module.css";

const SimpleAgronomist = () => {
    const tasks = useAppSelector(selectTaskMaterials)
    const fields  = useAppSelector(selectFields);
    const dispatch = useAppDispatch();
    console.log(tasks,fields)
    useEffect(()=>{
            setTimeout(()=>dispatch(setFieldsDBstateTC()))
        },[]
    )
    return (
        <div style={{color:"white",width: "100vw", height: "100vh", position: "relative"}}>
            <MapContainer center={[49.13658523465133, 35.60931303636023]} zoom={12} scrollWheelZoom={true}
                          style={{width: "100%", height: "100%", padding: 0,margin:0, zIndex: 0, cursor: "pointer"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {fields.map((el, i) => {
                    return (
                        <div>
                            {el.currentPerimeter.length&&
                                <Polygon  positions={el.currentPerimeter as LatLngExpression[]}>
                                    { <Tooltip   permanent direction="center" className={style.polygonTooltip}>
                                        <div style={{width:"100%", height:"100%",color:"black"}}>
                                            <div>{el.name ? `${el.name}` : "Нет данных"}</div>
                                            <div>{`S = ${el.perimeters.length ? el.perimeters[el.perimeters.length-1].sqere : "Не определено!"} Га`}</div>
                                            <span>{`Культура: ${el.currentCultures[0].culture}`}</span>
                                        </div>
                                    </Tooltip>}
                                </Polygon>
                            }
                        </div>
                    )})}

            </MapContainer>
        </div>)
};

export default SimpleAgronomist;