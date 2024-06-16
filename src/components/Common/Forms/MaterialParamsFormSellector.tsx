import React from 'react';
import {MaterialItemType, MaterialType} from "../../../BLL/material-reducer";
import CemicalCreateParamsForm from "./materialForms/CemicalCreateParamsForm";
import FertilizerCreateParamsForm from "./materialForms/FertilizerCreateParamsForm";
import CropsCreateParamsForm from "./materialForms/CropsCreateParamsForm";
import SuplyAMterialCreateParamsForm from "./materialForms/suplyAMterialCreateParamsForm";
type MaterialParamsFormSellectorPropsType = {
    typeOfMaterial:MaterialItemType
    onExit:()=>void


}
const MaterialParamsFormSellector:React.FC<MaterialParamsFormSellectorPropsType> = ({onExit, typeOfMaterial}) => {
    return (
        <div>
            {typeOfMaterial==="насіння"&& <CropsCreateParamsForm onExit={onExit}/>}
            {typeOfMaterial==="добрива"&& <FertilizerCreateParamsForm onExit={onExit}/>}
            {typeOfMaterial==="хімія" && <CemicalCreateParamsForm onExit={onExit}/>}
            {typeOfMaterial==="супутні" && <SuplyAMterialCreateParamsForm onExit={onExit}/>}
            {typeOfMaterial===""&& <></>}
        </div>
    );
};

export default MaterialParamsFormSellector;