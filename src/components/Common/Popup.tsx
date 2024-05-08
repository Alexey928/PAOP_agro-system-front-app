import React from 'react';
import FieldParamsForm from "./Forms/FieldParamsForm";
import {useAppDispatch, useAppSelector} from "../../BLL/Store";
import {
    selectFieldParamsPopupIsOpen,
    selectSelectedFieldTrajectory
} from "../../Utils/selectors";
import {createFieldTC} from "../../BLL/map-filds-reduser";

interface PopupProps {
    // setFieldParams: (id: string, name: string, squere: number) => void
}
const FormPopup: React.FC<PopupProps> = () => {
    const dispatch = useAppDispatch()
    const fieldPopupFlag = useAppSelector(selectFieldParamsPopupIsOpen);
    //const selectedFieldId = useAppSelector(selectSelectedFieldID);
    const selectedFieldTrajectory = useAppSelector(selectSelectedFieldTrajectory)

    return (
        fieldPopupFlag ? <div className="popup">
            <div style={{width:"100%"}}>
                <FieldParamsForm
                    name={""} sqere={""} setFieldParams={(name:string, squere:number, color:string) => {
                        dispatch(createFieldTC(name,"temp des",selectedFieldTrajectory, squere.toString(),color));
                    }}/>
            </div>
        </div>:
            <></>
    );
};
export default FormPopup;