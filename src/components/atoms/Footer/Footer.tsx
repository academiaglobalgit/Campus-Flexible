import { Box, Typography } from "@mui/material";

export const Footer: React.FC = () => {

    const text = `Derechos Reservados © AG COLLEGE; <br />
          Manuel Romero 96-A, Colonia Chapultepec C.P. 80040, Culiacán, Sinaloa, México; todo el material, imágenes y textos incluidos en esta página web, son propiedad de AG COLLEGE, y se encuentran protegidos por la legislación internacional y mexicana en materia de derechos de autor. Ninguna parte de esta página web podrá ser citada, copiada ni reproducida, en forma o medio alguno, sin el previo consentimiento por escrito de AG COLLEGE.`;

    return (
        <Box sx={{ color: '#231F20', mt: 2.5, mb: 4  }}>
            <Typography 
                variant="body1"
                component="footer" 
                dangerouslySetInnerHTML={{ __html: text }} 
            />
        </Box>
    );
};
