import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from "dayjs";

type BasicDateTimePickerPropsType = {
    onChange:(...event: any[]) => void
    value:string
    width:number

}
export  const BasicDateTimePicker:React.FC<BasicDateTimePickerPropsType> = ({width,onChange,value})=> {
    return (
        <LocalizationProvider  dateAdapter={AdapterDayjs}>
            <DemoContainer sx={{width}} components={['DateTimePicker']}>
                <DateTimePicker   value={value?dayjs(value):null} ampm={false}
                    onClose={()=>{
                    console.log("close")}
                }
                    onChange={(value)=>{
                    console.log(value?value.toDate():null)
                       if(value) onChange(value.toDate())
                    }}
                label="Планова дата виконання завдання" />
            </DemoContainer>
        </LocalizationProvider>
    );
}