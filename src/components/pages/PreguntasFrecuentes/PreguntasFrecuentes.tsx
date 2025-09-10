import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Container, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { TopBar } from "../../molecules/TopBar/TopBar";
import { AppRoutingPaths, TitleScreen } from "@constants";
import { AccordionPregunta } from "../../organisms/AccordionPregunta/AccordionPregunta";
import { Footer } from "../../atoms/Footer/Footer";
import { Document } from "../../../assets/icons";

import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { useGetPreguntasFrecuentes } from "../../../services/FaqsService";
import { loadConfig } from "../../../config/configStorage";

const PreguntasFrecuentes: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  
  const navigate = useNavigate();
  const location = useLocation();

  const [config, setConfig] = React.useState<any>(null);
  
  React.useEffect(() => {
      loadConfig().then(cfg => {
          setConfig(cfg);
      });
  }, []);

  const { data, isLoading } = useGetPreguntasFrecuentes(config?.data?.id_plan_estudio); 

  const [isExternal, setIsExternal] = React.useState(true);
  
  useEffect(() => {
    setIsExternal(location.pathname === AppRoutingPaths.PREGUNTAS_FRECUENTES);
  },[]);
  
  const onBack = () => navigate(isExternal ? "/" : AppRoutingPaths.HOME);

  const getTitleDivider = (grupo: string) => {
    switch (config?.data?.id_plan_estudio) { 
      case 17: return undefined;
      default: return grupo;
    }
  }

  return (
    config &&
    <Container maxWidth={isMobile ? 'xs' : 'lg' } sx={{ pt: 7, pb: 7 }}>
      <TopBar isExternal onBack={onBack} titleScreen={isMobile ? TitleScreen.PREGUNTAS_FRECUENTES : TitleScreen.BACK_HOME_EXT}  />
      {
        !isMobile &&
          <Box sx={!isMobile ? { paddingTop: '35px' } : {}}>
            <TituloIcon Titulo={!isMobile ? TitleScreen.PREGUNTAS_FRECUENTES : ""} Icon={Document} fontSize="h2" />
          </Box>
      }
      <Box sx={!isMobile ? { paddingLeft: '25px', paddingRight: '25px' } : {}}>
        {
          !isLoading ?
            Object.entries(data).map(([grupo, preguntas], index) =>
              (
                <AccordionPregunta titleDivider={getTitleDivider(grupo)} preguntas={preguntas} key={index} />
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
        }
      <Footer />
      </Box>
    </Container>
  );
};

export default PreguntasFrecuentes;