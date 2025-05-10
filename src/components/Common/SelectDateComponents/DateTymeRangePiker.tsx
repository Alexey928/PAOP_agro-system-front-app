import React, {useState} from 'react';
import {BasicDateTimePicker} from "./DateWidthTymePicer";
import {Button} from "@mui/material";

const DateTimeRangePiker = () => {
    const [rangeState,setRangeState] = useState({from:"",too:""});
    return (
        <div>
            <BasicDateTimePicker value={""}
                                 onChange={(date)=>{
                                         setRangeState((state) => ({...state,from: date}))}}
                                 width={200}
            />
            <BasicDateTimePicker  value={""}
                                  onChange={(date)=>{
                                      setRangeState((state) => ({...state,too: date}))}}
                                  width={200}
            />
            <Button onClick={()=>console.log(rangeState)}>встановити</Button>
        </div>
    );
};
export default DateTimeRangePiker;