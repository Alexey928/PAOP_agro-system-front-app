import React from 'react';
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";


const TaskConfigPopup = () => {
    return (
        <div  className={"popup"} style={{zIndex:2,}}>
            <div>
                <h2 style={{position:"sticky",backgroundColor:"#001a83",lineHeight:2,border:"1px solid #fff"}}>
                    ДОКЛАДНО ПРО ЗАВДВННЯ
                </h2>
                <span style={{float:"right",position:"relative",top:-63, right:10}}><Button variant={"contained"} color={"error"}>x</Button></span>
            </div>

            <div style={{display:"flex"}}>
                <div style={{width:"47vw",backgroundColor:"#772800", borderRadius:6}}>
                    <ul style = {{textAlign:"start"}}>
                        <li>ЗАВДАНА ПЛОЩА</li>
                        <li> МАТЕРІАЛИ :
                            <ul>
                                <li>матеріал №1</li>
                                <li>матеріал №1</li>
                                <li>матеріал №1</li>
                                <li>матеріал №1</li>
                            </ul>
                        </li>
                        <li>ПЛАНОВА ДАТА ВИКОННЯ</li>
                        <li> </li>
                        <li> some text </li>
                    </ul>
                    <Button disabled={false} variant={"contained"} color={"error"}>Виконано</Button>
                </div>
                <div style={{backgroundColor:"#0d1e00",width:"47vw"}}>
                    <h2>Змінна Карта</h2>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <FormControl  style={{width:190}} >
                            <InputLabel id="demo-simple-select-label">Водії</InputLabel>
                            <Select
                                SelectDisplayProps={
                                    {style: {
                                            color:'#01f6bd',
                                        }
                                    }}
                                label={"Виконані"}
                                value={""}
                                color={"primary"}
                                variant={"outlined"}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                            >
                                <MenuItem value={"курята"}>Курята</MenuItem>
                                <MenuItem value={"Сміренов"}>Сміренов</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField style={{width:80}} InputProps={{
                            style: {color:"white"},
                        }} label="Години" variant="outlined" type={"number"}/>
                        <TextField style ={{width:80,color:"#fff"}} type={"number"} InputProps={{
                            style: {color:"white"},
                        }} label="Га" variant="outlined"/>
                        <Button style={{marginLeft:20}} variant={"contained"} color={"success"}>+</Button>
                    </div>

                </div>
            </div>
            <div>
                <h2>
                    Закриті наряди цього завдання
                </h2>
            </div>

        </div>
    );
};

export default TaskConfigPopup;