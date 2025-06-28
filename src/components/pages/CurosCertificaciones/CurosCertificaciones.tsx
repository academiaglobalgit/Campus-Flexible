import { TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Typography } from "../../atoms/Typography/Typography";
import { CursosActivos } from "@iconsCustomizeds";
import { Box, Button } from "@mui/material";

const CurosCertificaciones: React.FC = () => {

    return (
        <>

            <Box sx={{ width: { md: '90vw' }, display: 'flex', flexDirection: 'column', gap: '20px' }}>

                <TituloIcon Titulo={TitleScreen.CURSOS_CERTIFICACIONES} Icon={CursosActivos} />

                <Typography component="span" variant="body1">
                    Aquí encontrarás la calificación final de cada curso, una vez que has realizado los exámenes correspondientes. El porcentaje de avance señala el total de bloques que se han evaluado al momento de tu consulta.            </Typography>

                <Button onClick={() => { }} variant="outlined" sx={{ width: "fit-content", padding: '6px 40px', display: 'flex', gap: '10px' }} >Click para ver el Glosario</Button>
            </Box>
        </>
    );
};

export default CurosCertificaciones;