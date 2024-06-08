import React from 'react';
import {MaterialItemType} from "../../../BLL/material-reducer";
import CemicalCreateParamsForm from "./materialForms/CemicalCreateParamsForm";
type MaterialParamsFormPropsType = {
    typeOfMaterial:MaterialItemType
}
const MaterialParamsForm:React.FC<MaterialParamsFormPropsType> = ({typeOfMaterial}) => {
    return (
        <div>
            {typeOfMaterial==="хімія" && <CemicalCreateParamsForm />}
        </div>
    );
};

export default MaterialParamsForm;