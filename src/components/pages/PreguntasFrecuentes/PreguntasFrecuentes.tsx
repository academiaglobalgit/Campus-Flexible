import { Typography, Container, Box } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { TopBar } from "../../molecules/TopBar/TopBar";
// import { BottomBar } from "../../molecules/BottomBar/BottomBar";
import { useNavigate } from "react-router-dom";
import { AppRoutingPaths, TitleScreen } from "@constants";
import { AccordionPregunta } from "../../organisms/AccordionPregunta/AccordionPregunta";

const PreguntasFrecuentes: React.FC = () => {
  const navigate = useNavigate();
  const onBack = () => navigate(AppRoutingPaths.HOME);

  return (
    <>
    <Container maxWidth='xs' sx={{ pt: 7, pb: 7 }}>
      <TopBar isExternal={true} onBack={onBack} titleScreen={TitleScreen.PREGUNTAS_FRECUENTES}  />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 2,
            mb: 2,
          }}
        >
          <HelpOutlineIcon color="primary" />
          <Typography color="primary" fontWeight={600}>
            Déjanos tu mensaje y nos contactaremos a la brevedad posible.
          </Typography>
        </Box>

        <AccordionPregunta titleDivider="Generales" preguntas={["1", "2", "3", "4","12", "22", "23"]} />
    </Container>
    {/* <BottomBar /> */}
    </>
  );
};

export default PreguntasFrecuentes;