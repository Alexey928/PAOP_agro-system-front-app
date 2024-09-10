import React from 'react';
import BasicTabs from "./Tabs";
import TablesForField from "./tabItems/TablesForField";
import TablesForMaterials from "./tabItems/TablesForMaterials";
import FieldStatistic from "./tabItems/fieldStatistic";

const Accountant = () => {
    return (
        <div style={{color:"white"}}>
            <BasicTabs>
                <TablesForField/>
                <TablesForMaterials/>
                <FieldStatistic/>
            </BasicTabs>
        </div>
    );
};

export default Accountant;