import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export type AccordionRows = {
rows:string[]
children: React.ReactNode[]|React.ReactNode
}
const AccordionRows:React.FC<AccordionRows> = (props)=> {
    return (
        <div>
            {props.rows.map((el,i)=>(
                <Accordion style={{
                    backgroundColor:"#000c2a",
                    borderBottom:"1px solid #01f6bd",
                    color:"white"}} key={i}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        {el}
                    </AccordionSummary>
                    <AccordionDetails style={
                        {
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"space-around",
                            gap:3,
                        }}>
                        {props.children}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>


    );
}
export default AccordionRows

// <div>
//     <Accordion>
//         <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls="panel1-content"
//             id="panel1-header"
//         >
//             Accordion 1 bbb
//         </AccordionSummary>
//         <AccordionDetails>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//             malesuada lacus ex, sit amet blandit leo lobortis eget.
//         </AccordionDetails>
//     </Accordion>
//     <Accordion>
//         <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls="panel2-content"
//             id="panel2-header"
//         >
//             Accordion 2
//         </AccordionSummary>
//         <AccordionDetails>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//             malesuada lacus ex, sit amet blandit leo lobortis eget.
//         </AccordionDetails>
//     </Accordion>
//     <Accordion defaultExpanded>
//         <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls="panel3-content"
//             id="panel3-header"
//         >
//             Accordion Actions
//         </AccordionSummary>
//         <AccordionDetails>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
//             malesuada lacus ex, sit amet blandit leo lobortis eget.
//         </AccordionDetails>
//         <AccordionActions>
//             <Button>Cancel</Button>
//             <Button>Agree</Button>
//         </AccordionActions>
//     </Accordion>
// </div>