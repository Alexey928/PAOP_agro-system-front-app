import React from 'react';
import BasicTabs from "./Tabs";
import TableForField from "./tabItems/TableForField";
import {TableOfWorkers} from "./tabItems/TableOfWorkers";
import FieldStatistic from "./tabItems/fieldStatistic";
import AccordionRows from "./AcardionRows";


const tempDataForFields = [
    "поле1  посев  с 12.09.24 по 12.09.24 зтрата = 23000 грн." ,
    "поле1  посев  с 12.09.24 по 12.09.24 зтрата = 23000 грн." ,
    "поле1  посев  с 12.09.24 по 12.09.24 зтрата = 23000 грн." ,
    "поле1  посев  с 12.09.24 по 12.09.24 зтрата = 23000 грн." ,
    "поле1  посев  с 12.09.24 по 12.09.24 зтрата = 23000 грн." ,
    "поле1  посев  с 12.09.24 по 12.09.24 зтрата = 23000 грн." ,
    "поле1  посев  с 12.09.24 по 12.09.24 зтрата = 23000 грн." ,
    "поле1  посев  с 12.09.24 по 12.09.24 зтрата = 23000 грн." ,
    "поле1  посев  с 12.09.24 по 12.09.24 зтрата = 23000 грн." ,
    "поле1  посев  с 12.09.24 по 12.09.24 зтрата = 23000 грн." ,

]
const temoDataForMaterials = [
    "Кукуруза Агресор --> Поле 1 (12.09.24)",
    "Кукуруза Агресор --> Поле 1 (12.09.24)",
    "Кукуруза Агресор --> Поле 1 (12.09.24)",
    "Кукуруза Агресор --> Поле 1 (12.09.24)",
    "Кукуруза Агресор --> Поле 1 (12.09.24)",
    "Кукуруза Агресор --> Поле 1 (12.09.24)",
    "Кукуруза Агресор --> Поле 1 (12.09.24)",
]

const Accountant = () => {
    return (
        <div className={"widthAutScrollLine"} style={{color:"white",paddingTop:30,overflow:"scroll"}}>
            <BasicTabs>
                <AccordionRows rows={tempDataForFields} >
                    <TableForField/>
                    <TableOfWorkers/>
                </AccordionRows>
                <AccordionRows rows={temoDataForMaterials} >
                    <TableForField/>
                    <TableOfWorkers/>
                </AccordionRows>
                <FieldStatistic/>
            </BasicTabs>
        </div>
    );
};

export default Accountant;