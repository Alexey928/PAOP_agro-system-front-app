import React from 'react';
import {Button, Input, Paper} from "@mui/material";

const Login = () => {
    return (
        <div style={{display:"flex",alignItems:"center"}}>
            Login PAge
            <Paper variant={"outlined"} style={{width:400}}>
                <label>Name *</label>
                <Input type={"text"} style={{margin:20}}/>
                {/*<Button variant={"contained"}>+</Button>*/}
                <label>Email *</label>
                <Input type={"text"} style={{margin:20}}/>
                <Input type={"text"} style={{margin:20}}/>
                <Input type={"text"} style={{margin:20}}/>
            </Paper>


        </div>
    );
};

export default Login;