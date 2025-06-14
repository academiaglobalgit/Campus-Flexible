import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { TopBar } from "../../molecules/TopBar/TopBar";
import { AppRoutingPaths, TitleScreen } from "@constants";
import { AccordionPregunta } from "../../organisms/AccordionPregunta/AccordionPregunta";
import { Footer } from "../../atoms/Footer/Footer";
import { Document } from "../../../assets/icons";

import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";

const PreguntasFrecuentes: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExternal, setIsExternal] = React.useState(true);
  
  useEffect(() => {
    setIsExternal(location.pathname === AppRoutingPaths.PREGUNTAS_FRECUENTES);
  },[]);
  
  const onBack = () => navigate(isExternal ? AppRoutingPaths.LOGIN : AppRoutingPaths.HOME);

  return (
    <>
      {
        isExternal 
        ? 
          <Container maxWidth='xs' sx={{ pt: 7, pb: 7 }}>
            <TopBar isExternal={true} onBack={onBack} titleScreen={TitleScreen.PREGUNTAS_FRECUENTES}  />
            <TituloIcon Titulo="Déjanos tu mensaje y nos contactaremos a la brevedad posible." />
            <AccordionPregunta titleDivider="Generales" preguntas={["1", "2", "3", "4","12", "22", "23"]} />
            <Footer />
          </Container>
        :
        <>
          <TituloIcon Titulo={TitleScreen.PREGUNTAS_FRECUENTES} Icon={ !isExternal ? Document : undefined } />
          <AccordionPregunta titleDivider="Generales" preguntas={["1", "2", "3", "4","12", "22", "23"]} isExternal={false} />
        </>
      }
    </>
  );
};

export default PreguntasFrecuentes;