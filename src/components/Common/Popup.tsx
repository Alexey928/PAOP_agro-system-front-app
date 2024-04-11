import React from 'react';
import {CultureType} from "../General_agronomist/temp";
import FieldParamsForm from "./Forms/FieldParamsForm";
import CulturesParamsForm from "./Forms/CulturesParamsForm";

interface PopupProps {
    onClose: () => void;
    setFieldParams: (id: string, name: string, squere: number) => void
    setCulture: (FieldID: string, name: string, sqere: number, collor: string, variantyName: string) => void;
    fieldCultures: CultureType;
    FieldID: string | undefined;
}


const FormPopup: React.FC<PopupProps> = ({onClose, FieldID, setFieldParams, setCulture,fieldCultures}) => {
    console.log(FieldID);
    return (

        <div className="popup">
            <button className="close-button" onClick={onClose}>
                X
            </button>
            <div style={{width: "93%", border: "1px solid #91f8a5", display: "flex", flexDirection: "column"}}
            >
                <FieldParamsForm
                    name={""} sqere={""}
                    setFieldParams={(name:string, squere:number) => {
                        setFieldParams(FieldID!, name, squere)
                    }}/>
                <br/>
                <CulturesParamsForm
                    setCultuteParam={(name: string, sqere: number, collor: string, variantyName: string) => {
                        setCulture(FieldID!, name, sqere, variantyName, collor);
                    }}/>
            </div>
            { fieldCultures[FieldID!] ? fieldCultures[FieldID!].map((el) => {
                return(
                    <div style={{border:`3px solid ${el.collor}`,height:30}}>{`${el.name} ( ${el.variantyName} )  ---- ${el.sqere} Га ` }</div>
                )
            }):null}

        </div>


    );
};

export default FormPopup;