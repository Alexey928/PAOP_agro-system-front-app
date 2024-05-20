import React from 'react';
import {useAppSelector} from "../../BLL/Store";
import {selectTaskParamsPopupIsOpen} from "../../Utils/selectors";


const TaskParamPopup = () => {
    const fieldPopupFlag = useAppSelector(selectTaskParamsPopupIsOpen);
    return (
        fieldPopupFlag ? <div className="popup">
                <div style={{width:"100%"}}>


                </div>
            </div>:
            <></>
    );
};

export default TaskParamPopup;