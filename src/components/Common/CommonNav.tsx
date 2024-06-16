import React from 'react';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
type AuthNawPropsType = {
   derection:string
    linkText:string
    headerText:string
}

const CommonNav:React.FC<AuthNawPropsType> = ({derection,linkText,headerText}) => {
    const navigate = useNavigate();
    return (
        <div>
            <Box sx={{ flexGrow: 2 }}>
                <AppBar position="absolute">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {headerText}
                        </Typography>
                        <Button onClick={()=> {
                               navigate(derection)
                            }} color="inherit">{linkText}
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};
export default CommonNav;