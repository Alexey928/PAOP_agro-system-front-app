import React, {useState} from 'react';
import {Circle, FeatureGroup, MapContainer, Polygon, Popup, TileLayer, useMapEvents} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import {LatLngExpression} from "leaflet"
import FormPopup from "../Common/Popup";
import {useFields} from "./hooks/useFields";
import {Button} from "@mui/material";

type PositionType = {
    lat: number,
    lng: number
}
//_________________________TASKS TYPE_________________________________
type MowingTheCropTaskType = {
    fieldID:string
    status: "isDone" | "inProgres"
    type: "MOWING_THE_CROP"
    startDate: Date
    endDate: Date
    harvesterID:string
}
type SprayingTaskType = {
    fieldID:string
    status: "isDone" | "inProgres"
    type: "SPRAYING_GROUP"
    startDate: Date
    endDate: Date
    sprayingMachineId:string
}
type SoilWorksTaskType = {
    fieldID:string
    status: "isDone" | "inProgres"
    type: "SOIL_GROUP"
    startDate: Date
    endDate: Date
    tractorID:string
}
type FertilizationTasksType = {
    fieldID:string
    status: "isDone" | "inProgres"
    type: "FERTILIZATION_GROUP"
    startDate: Date
    endDate: Date
}
//____________________________________________________________________________

export type FieldType = {
    id: string;// forigen
    trajectory: number[][];
    name: string | null;
    sqere: number| null;
}
//  in this case "id" is forigen key from FieldType
export  type SoilTasksTypes = {
    [id:string]:{
        SOIL_GROUP:Array<SoilWorksTaskType>;
        FERTILIZATION_GROUP:Array<FertilizationTasksType>;
    }
}
export type CultureItemType = {
    id:string,
    name:string,
    variantyName:string,
    collor:string,
    sqere:number
}
export type CultureType = {
    [id:string]:Array<CultureItemType>
}
//  in this case "id" is forigen key from CultureType children
export type CultureTaskType = {
    [id:string]:{
        "SPRAYING_GROUP":Array<SprayingTaskType>;
        "MOWING_THE_CROP":Array<MowingTheCropTaskType>
    }
}

const fillBlueOptions = {fillColor: 'blue'}
const limeOptions = {color: '#e305f1', fillColor: "rgb(241,5,40)"}
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
    const {agroFields,fieldCultures,thoisedFieldID,
        setNewField,setCulture,deleteField,setFieldParams,setThoisedFieldID} = useFields()
    const [painedPosition, setPainedPosition] = useState<Array<PositionType>>([]);
    const [flagForPaointPaint, setFlagForPointPaint] = useState<boolean>(false);
    const [isPopupOpen, setPopupOpen] = useState<boolean>(false);

    console.log(agroFields);

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
    const handleOpenPopup = () => {
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
        setFlagForPointPaint(false);
    };

    const handleDeleteButton = (id:string)=>{

    }

    return (
        <div style={{width: "100vw", height: "100vh", position: "relative"}}>
            <MapContainer center={[49.9935, 36.230383]} zoom={10} scrollWheelZoom={true}
                          style={{width: "100%", height: "100%", padding: 0,margin:0, zIndex: 0, cursor: "pointer"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <PointOfPoligons calback={flagForPaointPaint ? calback : () => {}}/>
                {agroFields.map((el, i) => {
                    return (
                        <FeatureGroup key={el.id} eventHandlers={{
                            click: () => {
                                setThoisedFieldID(el.id)
                                console.log(el.name, el.sqere);
                            }
                        }} pathOptions={limeOptions}>
                            <Popup  className={"leaflet-popup-content-wrapper"}>
                                <div style={{color: "blue", height: 300, backgroundColor: "#010a28", width: 280}}>
                                    <header style={{width: "100%", backgroundColor: "salmon"}}>
                                        <div style={{color: "white", textAlign: "center"}}>
                                            {el.name??"Поле X Полевая Y"} S = {el.sqere??"?"}
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
                                            onClick={() => setPopupOpen(!isPopupOpen)}
                                    >+ ЗАВДАННЯ</Button>
                                    <Button variant={"contained"}
                                            onClick={()=>{deleteField(el.id)}}
                                            color={"error"}
                                    >ВИДАЛИТИ</Button>
                                </div>

                            </Popup>
                            <Polygon  positions={el.trajectory as LatLngExpression[]}/>
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

            <div style={{boxShadow:"rgb(41 34 94 / 84%) -1px 0px 7px 1px",color:"white",position:"absolute" ,right:8,top:8,display:"flex",flexDirection:"column",backgroundColor:"rgba(2,9,47,0.78)", padding:5,borderRadius:5}}>
                Рисовать поле {" "}
                <input onChange={() => {
                    setFlagForPointPaint(!flagForPaointPaint)
                }} type={"checkbox"} checked={flagForPaointPaint}/>
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
                    handleOpenPopup();
                }}> +
                </button>
            </div>
            {isPopupOpen && <FormPopup

                FieldID={thoisedFieldID}
                fieldCultures={fieldCultures}
                setFieldParams={setFieldParams}
                setCulture={setCulture}
                onClose={handleClosePopup}
            />}

        </div>
    );
};
export default General_agronomist;
