import React from 'react';
import {useAppSelector} from "../../../BLL/Store";
import {selectReportPopupFlag} from "../../../Utils/selectors";
import FullReportPopup from "./FullReportPopup";



export const FullReportContainer = () => {
    const flag = useAppSelector(selectReportPopupFlag);
    return (
        flag?
        <div>
            <FullReportPopup/>
        </div>:<></>
    );
};

export default FullReportContainer;