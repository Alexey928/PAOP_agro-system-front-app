import React from 'react';
import {CultureType} from "../General_agronomist/General_agronomist";
import FieldParamsForm from "./Forms/FieldParamsForm";
import { useAppSelector} from "../../BLL/Store";
import {selectFieldParamsPopupIsOpen} from "../../Utils/selectors";



interface PopupProps {

    setFieldParams: (id: string, name: string, squere: number) => void
    setCulture: (FieldID: string, name: string, sqere: number, collor: string, variantyName: string) => void;
    fieldCultures: CultureType;
    FieldID: string | undefined;
}
const FormPopup: React.FC<PopupProps> = ({FieldID, setFieldParams}) => {
    const fieldPopupFlag = useAppSelector(selectFieldParamsPopupIsOpen);
    console.log(FieldID);
    return (
        fieldPopupFlag ? <div className="popup">
            <div style={{width:"100%"}}>
                <FieldParamsForm
                    name={""} sqere={""} setFieldParams={(name:string, squere:number) => {
                        setFieldParams(FieldID!, name, squere)
                    }}/>
            </div>
        </div>:
            <></>
    );
};
export default FormPopup;