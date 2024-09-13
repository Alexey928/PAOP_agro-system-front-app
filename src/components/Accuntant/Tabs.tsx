import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const tempData = [
    "поле1  посев  с 12.09.24 по " ,
    "поле1  посев  с 12.09.24 по ",
    "поле1  посев  с 12.09.24 по "
]

export default function BasicTabs(props:{children: React.ReactNode[]}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    console.log(value);
    return (
        <div >
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: '#08f1f1' }}>
                <Tabs sx={{
                    '& .MuiTab-root': {
                        color: '#08f1f1', // Non-active tab color
                    },
                    '& .Mui-selected': {
                        color: '#b4f802', // Active tab color
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#f1cb05', // Underline color for active tab
                    },
                }}
                    value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Сводні по полях" {...a11yProps(0)} />
                    <Tab label="Сводні по матеріалам" {...a11yProps(1)} />
                    <Tab label="Вибірково по полю" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {props.children[0]}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {props.children[1]}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                {props.children[2]}
            </CustomTabPanel>
        </Box>
        </div>
    );
}
