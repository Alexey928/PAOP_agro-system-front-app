import React, {useState} from 'react';
import MaterialSelector from "./MaterialSelectorModule/MaterialSelector";
import {useAppSelector} from "../../BLL/Store";
import {selectMaterialEditorFlag} from "../../Utils/selectors";
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {setMaterialEditorFlag} from "../../BLL/map-interfase-reduser";
import {MaterialItemType} from "../../BLL/material-reducer";
import MaterialParamsFormSellector from "./Forms/MaterialParamsFormSellector";


const MaterialParamsPopupContayner = () => {
const [typeOfMaterial, setTypeOfMaterial] = useState<MaterialItemType>("");
const popupFlag = useAppSelector(selectMaterialEditorFlag);

const dispatch = useDispatch();
    return (
        popupFlag ?
            <div >
                { !typeOfMaterial ? <div className="popup" style={{ paddingTop:15, display:"flex",justifyContent:"center",flexDirection:"row",flexWrap:"wrap",gap:15,overflow:"scroll"}}>
                    <MaterialSelector materialType={"хімія"} krud
                                      onAddMaterial={(material)=>{
                        setTypeOfMaterial(material.type);
                    }}/>
                    <MaterialSelector materialType={"насіння"} krud onAddMaterial={(material)=>{
                        setTypeOfMaterial(material.type);
                    }}/>
                    <MaterialSelector materialType={"добрива"} onAddMaterial={(material)=>{
                        setTypeOfMaterial(material.type);
                    }} krud/>
                    <MaterialSelector materialType={"супутні"} onAddMaterial={(material)=>{
                        setTypeOfMaterial(material.type);
                    }} krud/>

                    <Button onClick={()=>{dispatch(setMaterialEditorFlag())}}
                            style={{backgroundColor:"red",color:"white",borderRadius:"50%",position:"fixed",top:10,right:15,maxWidth:50}}
                            variant={"contained"}
                            size={"small"}
                    >
                        X
                    </Button>
                </div>:<div className={"popup"}>
                    <MaterialParamsFormSellector onExit={()=>{setTypeOfMaterial("")}} typeOfMaterial={typeOfMaterial}/>
                </div>
                }
            </div>
        :
        <></>

    );
};

export default MaterialParamsPopupContayner;