import React from 'react';
import {CultureType} from "../General_agronomist/General_agronomist";
import FieldParamsForm from "./Forms/FieldParamsForm";
import {Button} from "@mui/material";


interface PopupProps {
    onClose: () => void;
    setFieldParams: (id: string, name: string, squere: number) => void
    setCulture: (FieldID: string, name: string, sqere: number, collor: string, variantyName: string) => void;
    fieldCultures: CultureType;
    FieldID: string | undefined;
}
const FormPopup: React.FC<PopupProps> = ({onClose, FieldID, setFieldParams}) => {
    console.log(FieldID);
    return (

        <div className="popup">
            <div style={{width:"100%"}}>
                <FieldParamsForm
                    name={""} sqere={""} closePupup={onClose}
                    setFieldParams={(name:string, squere:number) => {
                        setFieldParams(FieldID!, name, squere)
                    }}/>
            </div>
            <br/>
            <div >
                <Button variant={"contained"} onClick={onClose} >
                    X
                </Button>
            </div>
            <br/>
        </div>


    );
};

export default FormPopup;