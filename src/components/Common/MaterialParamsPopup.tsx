import React from 'react';
import MaterialSelector from "./MaterialSelectorModule/MaterialSelector";
import {useAppSelector} from "../../BLL/Store";
import {selectMaterialeditorFlag} from "../../Utils/selectors";

const MaterialParamsPopup = () => {
const popupFlag = useAppSelector(selectMaterialeditorFlag)
    return (
        popupFlag ?
        <div className="popup" style={{alignItems:"center"}}>
            <MaterialSelector materialType={"хімія"} krud/>
            <MaterialSelector materialType={"пакування"} krud/>
        </div>:
        <></>

    );
};

export default MaterialParamsPopup;