import React from "react";
import { Box, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { TitleScreen } from "@constants";
import { AccordionPregunta } from "../../organisms/AccordionPregunta/AccordionPregunta";
import { Document } from "../../../assets/icons";

import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { useGetPreguntasFrecuentes } from "../../../services/FaqsService";

const PreguntasFrecuentesInternas: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data, isLoading } = useGetPreguntasFrecuentes(1);

  const accordionPreguntas = () => (
      !isLoading ?
        Object.entries(data).map(([grupo, preguntas], index) =>
          (
            <AccordionPregunta titleDivider={grupo} preguntas={preguntas} key={index} />
          )  
        )
      :
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        {
          [1,2,3,4,5].map((_, i) => <Skeleton variant="rounded" height={70} key={i} />)
        }
      </Box>
  );

  return (
    isMobile 
    ? 
      <>
          <TituloIcon Titulo={TitleScreen.PREGUNTAS_FRECUENTES} Icon={ Document } />
          {accordionPreguntas()}
      </>
    :
      <Box sx={{ width: { md: '90vw' }, display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <Box sx={{ paddingTop: '35px' }}>
          <TituloIcon Titulo={!isMobile ? TitleScreen.PREGUNTAS_FRECUENTES : ""} Icon={Document} fontSize="h2" />
        </Box>
        <Box sx={{paddingLeft: '25px', paddingRight: '25px'}}>
            {accordionPreguntas()}
        </Box>
      </Box>
  );
};

export default PreguntasFrecuentesInternas;