import React from 'react';
import MaterialSelector from "./MaterialSelectorModule/MaterialSelector";
import {useAppSelector} from "../../BLL/Store";
import {selectMaterialeditorFlag} from "../../Utils/selectors";
import {Button} from "@mui/material";
import {setMaterialEditorFlag} from "../../BLL/map-interfase-reduser";
import {useDispatch} from "react-redux";

const MaterialParamsPopup = () => {
const popupFlag = useAppSelector(selectMaterialeditorFlag);
const dispatch = useDispatch();
    return (
        popupFlag ?
        <div className="popup" style={{alignItems:"center"}}>
            <MaterialSelector materialType={"хімія"} krud/>
            <MaterialSelector materialType={"пакування"} krud/>
            <MaterialSelector materialType={"насіння"} krud/>
            <Button onClick={()=>{dispatch(setMaterialEditorFlag())}}>Вихід</Button>
        </div>:
        <></>

    );
};

export default MaterialParamsPopup;