import React from 'react';
import {useAppSelector} from "../../BLL/Store";
import {selectSelectedField, selectTaskParamsPopupIsOpen} from "../../Utils/selectors";
import TaskParamForm from "./Forms/TaskParamForm";

const TaskParamPopup = () => {
    const fieldPopupFlag = useAppSelector(selectTaskParamsPopupIsOpen);
    const selectedField = useAppSelector(selectSelectedField)
    return (
        fieldPopupFlag ? <div className="popup">
            <div>Створення Завдання для:{<div style={{color:"#54ff00"}}>{selectedField.name.toUpperCase()}</div>}</div>
            <TaskParamForm currentFieldSqere={+selectedField.perimeters[selectedField.perimeters.length-1].sqere}/>
        </div>: <></>
    );
};

export default TaskParamPopup;