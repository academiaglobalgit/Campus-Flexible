import React from "react";
import { Box, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { TitleScreen } from "@constants";
import { AccordionPregunta } from "../../organisms/AccordionPregunta/AccordionPregunta";
import { Document } from "../../../assets/icons";

import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { useGetPreguntasFrecuentes } from "../../../services/FaqsService";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { loadConfig } from "../../../config/configStorage";

const PreguntasFrecuentesInternas: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [config, setConfig] = React.useState<any>(null);
    
  React.useEffect(() => {
      loadConfig().then(cfg => {
          setConfig(cfg);
      });
  }, []);

  const { data, isLoading } = useGetPreguntasFrecuentes(config?.data?.id_plan_estudio); 

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
    config && 
      isMobile 
      ? 
        <>
            <TituloIcon Titulo={TitleScreen.PREGUNTAS_FRECUENTES} Icon={ Document } />
            {accordionPreguntas()}
        </>
      :
        <ContainerDesktop title={TitleScreen.PREGUNTAS_FRECUENTES}>
          {accordionPreguntas()}
        </ContainerDesktop>
  );
};

export default PreguntasFrecuentesInternas;