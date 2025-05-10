import React, {useMemo} from 'react';
import {useAppDispatch, useAppSelector} from "../../../BLL/Store";
import {selectFieldInfoFlag, selectTaskMaterials} from "../../../Utils/selectors";
import {Button} from "@mui/material";
import {setFieldInfoFlag} from "../../../BLL/map-interfase-reduser";
import {mapFieldStateType} from "../../../BLL/map-filds-reduser";
import DateTimeRangePiker from "../SelectDateComponents/DateTymeRangePiker";
type FieldInformationPopupType = {
    fields:mapFieldStateType
}
export const FieldInformationPopup = (props:FieldInformationPopupType) => {
    const dispatch = useAppDispatch();
    const fieldId = useAppSelector(selectFieldInfoFlag).fieldId;
    const tasks = useAppSelector(selectTaskMaterials)[fieldId];
    const [currentField] = useMemo(()=>{
        return props.fields.filter((el)=>el.id===fieldId);
    },[fieldId]);


    return (
        fieldId ?
        <div className={"popup"} >
            <DateTimeRangePiker/>
           <div>{currentField.name??"Не знайдено"}</div>
            <Button variant={"contained"} color={"error"} onClick={ ()=>{
                dispatch(setFieldInfoFlag({flag:false,fieldId:""}))
                }}>X
            </Button>
        </div>:<></>
    );
};

export default FieldInformationPopup;


