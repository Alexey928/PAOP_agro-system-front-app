import React from 'react';
import {MaterialItemType} from "../../../BLL/material-reducer";
import CemicalCreateParamsForm from "./materialForms/CemicalCreateParamsForm";
import FertilizerCreateParamsForm from "./materialForms/FertilizerCreateParamsForm";
import CropsCreateParamsForm from "./materialForms/CropsCreateParamsForm";
import SuplyAMterialCreateParamsForm from "./materialForms/suplyAMterialCreateParamsForm";
type MaterialParamsFormSellectorPropsType = {
    typeOfMaterial:MaterialItemType
    onExit:()=>void
    selectdBylist?:boolean
}
const MaterialParamsFormSellector:React.FC<MaterialParamsFormSellectorPropsType> = ({onExit, typeOfMaterial,selectdBylist}) => {
    return (
        !selectdBylist?
        <div>
            {typeOfMaterial==="насіння"&& <CropsCreateParamsForm onExit={onExit}/>}
            {typeOfMaterial==="добрива"&& <FertilizerCreateParamsForm onExit={onExit}/>}
            {typeOfMaterial==="хімія" && <CemicalCreateParamsForm onExit={onExit}/>}
            {typeOfMaterial==="супутні" && <SuplyAMterialCreateParamsForm onExit={onExit}/>}
            {typeOfMaterial===""&& <></>}
        </div>:<div></div>
    );
};

export default MaterialParamsFormSellector;