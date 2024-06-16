import React from 'react';
import {Button} from "@mui/material";

export type SuplyMaterialCreateParamsFormPropsType = {
    onExit:()=>void
}

const SuplyAMterialCreateParamsForm:React.FC<SuplyMaterialCreateParamsFormPropsType> = ({onExit}) => {
    return (
        <form>
            <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
                <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:15,marginTop:60,marginBottom:120}}>

                </div>
            </div>
            <Button onClick={onExit} color={"error"} variant={"contained"}>Вихід</Button>
            <Button type={"submit"} variant={"contained"}>Зберегти</Button>
        </form>
    );
};

export default SuplyAMterialCreateParamsForm;