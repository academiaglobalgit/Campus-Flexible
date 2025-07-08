import React from "react";
import { Box, Divider } from "@mui/material";
import { VideoCard } from "../../molecules/VideoCard/VideoCard";
import TabPanel from "../../molecules/TabPanel/TabPanel";
import PeriodosTabs from "../../molecules/PeriodosTabs/PeriodosTabs";
import { Typography } from "../../atoms/Typography/Typography";

const VideotecaDetalle: React.FC = () => {
    const [value, setValue] = React.useState(0);
    
    return (
        <>
            <PeriodosTabs periodos={9} tabChange={(newValue) => setValue(newValue)} />
            {
                Array.from({ length: 9 }).map((_, indexPanel) => (
                    <TabPanel value={value} index={indexPanel} key={indexPanel}>
                        <Box sx={{ marginBottom: '24px', pt: '16px' }}>
                            <Divider textAlign="center">
                                <Typography component="span" variant="subtitle1" color="primary">Nombre Materia</Typography>
                            </Divider>
                            {
                                Array.from({ length: 5 }).map((_, index) => (
                                    <Box sx={{ marginBottom: '24px' }} key={index}>
                                        <VideoCard 
                                            urlVideo="https://www.w3schools.com/html/mov_bbb.mp4"
                                            controls={true}
                                            autoPlay={false}
                                            muted={false}
                                            title={`Panel ${indexPanel + 1} - Video ${index + 1}`}
                                            description={`Descripción del video ${index + 1}`}
                                            fontSizeTitle="h4"
                                        />
                                    </Box>
                                    
                                ))
                            }
                        </Box>
                    </TabPanel>
                ))
            }
            
        </>
    )
};

export default VideotecaDetalle;