import React from 'react';
import {Button, FormControl, Input, InputLabel, MenuItem, Paper, Select, SelectChangeEvent} from "@mui/material";
import { useForm,  SubmitHandler ,Controller} from "react-hook-form"

interface IFormInputs {
 Name: string;
 Password: string
 Rolls:{label:string,value:string}
}
const Registration = () => {
    const [age, setAge] = React.useState('');
    const { control, handleSubmit } = useForm({
        defaultValues: {
            Name: "",
            Password: "",
            Rolls:{label:"",value:""}
        },
    })
    const onSubmit: SubmitHandler<IFormInputs> = (data) => {
        console.log(data)
    }
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
            <div>Login PAge</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Paper  elevation={0} variant={"outlined"} style={{width:350}}>
                    <ul >
                        <Controller name={"Name"} control={control} render={(field)=>(
                            <li>
                                <label>Name *</label>
                                <Input type={"text"} color={"secondary"} />
                            </li>)}
                        />

                        <Controller name={"Name"} control={control} render={(field)=>(
                            <li>
                                <label>Password *</label>
                                <Input type={"text"} color={"secondary"} />
                            </li>)}
                        />
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
                                    <MenuItem value={10}>Головний огроном</MenuItem>
                                    <MenuItem value={30}>Рядовий огроном</MenuItem>
                                    <MenuItem value={20}>Бугалтер</MenuItem>

                                </Select>
                            </FormControl>
                        </li>
                    </ul>


                    <Input type = {"submit"}/>

                    <Input type={"text"} style={{margin:20}}/>
                    <Input type={"text"} style={{margin:20}}/>
                </Paper>
            </form>


        </div>
    );
};
export default Registration;