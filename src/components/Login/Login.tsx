import React from 'react';
import {Button, FormControl, Input, InputLabel, MenuItem, Paper, Select, SelectChangeEvent} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form"

interface IFormInputs {
 Name: string;
 Password: string
}



const Login = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
            <div>Login PAge</div>
            <form>
            <Paper  elevation={0} variant={"outlined"} style={{width:350}}>
                <ul >
                    <li>
                        <label>Name *</label>
                        <Input type={"text"} color={"secondary"} />
                    </li>
                    <li>
                        <label>Email *</label>
                        <Input type={"text"} />
                    </li>
                    <li>
                        <label>Password *</label>
                        <Input type={"text"} />
                    </li>
                    <li>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Роль</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Роль"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Глваный агроном</MenuItem>
                                <MenuItem value={20}>ACU</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </li>
                </ul>


                <Button variant={"contained"}>+</Button>

                <Input type={"text"} style={{margin:20}}/>
                <Input type={"text"} style={{margin:20}}/>
            </Paper>
            </form>


        </div>
    );
};

export default Login;