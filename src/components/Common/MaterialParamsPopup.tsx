import React from 'react';
import MaterialSelector from "./MaterialSelectorModule/MaterialSelector";
import {useAppSelector} from "../../BLL/Store";
import {selectMaterialeditorFlag} from "../../Utils/selectors";
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {setMaterialEditorFlag} from "../../BLL/map-interfase-reduser";

const MaterialParamsPopup = () => {
const popupFlag = useAppSelector(selectMaterialeditorFlag);
const dispatch = useDispatch();
    return (
        popupFlag ?
            <div>
                <div className="popup" style={{flexDirection:"row",flexWrap:"wrap",gap:20,overflow:"scroll"}}>
                    <MaterialSelector materialType={"хімія"} krud onChange={()=>{}}/>
                    <MaterialSelector materialType={"пакування"} krud/>
                    <MaterialSelector materialType={"насіння"} krud/>
                    <MaterialSelector materialType={"супутні"} krud/>
                    <MaterialSelector materialType={"добрива"} krud/>

                    <Button onClick={()=>{dispatch(setMaterialEditorFlag())}}
                            style={{backgroundColor:"red",color:"white",borderRadius:"50%",position:"fixed",top:10,right:30,maxWidth:50}}
                            variant={"contained"}
                            size={"small"}
                    >
                        X
                    </Button>
                </div>
            </div>
        :
        <></>

    );
};

export default MaterialParamsPopup;