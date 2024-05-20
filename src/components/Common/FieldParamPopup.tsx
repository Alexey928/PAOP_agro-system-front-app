import React from 'react';
import FieldParamsForm from "./Forms/FieldParamsForm";
import {useAppDispatch, useAppSelector} from "../../BLL/Store";
import {
    selectFieldParamsPopupIsOpen, selectSelectedField,
    selectSelectedFieldTrajectory
} from "../../Utils/selectors";
import {createFieldTC} from "../../BLL/map-filds-reduser";

interface PopupProps {

}
const FieldParamFormPopup: React.FC<PopupProps> = () => {
    const dispatch = useAppDispatch()
    const fieldPopupFlag = useAppSelector(selectFieldParamsPopupIsOpen);
    const selectedFieldTrajectory = useAppSelector(selectSelectedFieldTrajectory)
    const selectedField = useAppSelector(selectSelectedField);
    return (
        fieldPopupFlag ? <div className="popup">
            <div style={{width:"100%"}}>
                <FieldParamsForm
                    name={selectedField.name ?? ""}
                    sqere={selectedField.perimeters[selectedField.perimeters.length-1].sqere??""}
                    color={selectedField.fillColor??"#57fd02"}
                    setFieldParams={(name:string, squere:number, color:string) => {
                        dispatch(createFieldTC(name,"temp des",selectedFieldTrajectory, squere.toString(),color));
                    }}/>
            </div>
        </div>:
            <></>
    );
};
export default FieldParamFormPopup;