import Box from "@mui/material/Box";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { Typography } from "../../atoms/Typography/Typography";
import { useTheme } from "@mui/material";
import DsSvgIcon from "../../atoms/Icon/Icon";
import { BibliotecaCig, EventosFormativos, Libros, RecursosDatos } from "@iconsCustomizeds";
import { flexColumn } from "@styles";
import Button from "../../atoms/Button/Button";
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import { Outlet, useLocation, useNavigate } from "react-router-dom";


const cards_array = [
    {
        icon: BibliotecaCig,
        text: "Al estudiar en línea, la Biblioteca de CONALITEG se convertirá en tu aliado ya que podrás consultar sus libros desde cualquier lugar y en el momento en que lo decidas."
    },
    {
        icon: Libros,
        text: "En esta biblioteca, encontrarás una amplia colección de libros que se han desarrollado pensando en las necesidades particulares de cada uno de tus cursos."
    },
    {
        icon: EventosFormativos,
        text: "A través de este Campus, podrás interactuar con una amplia gama de contenidos educativos que te ayudarán al desarrollo de habilidades de reflexión, de análisis y de pensamiento crítico."
    },
    {
        icon: RecursosDatos,
        text: "La Biblioteca de CONALITEG fomenta la autodirección de tus estudios, contribuyendo a fortalecer un sentido de responsabilidad y autodeterminación en tu formación académica."
    }
];


const CentroInformacionGlobal: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate()


    const cards = (card, index: number) => {
        return (
            <Box
                key={index}
                sx={{
                    minHeight: '136px',
                    maxWidth: '470px',
                    borderRadius: '10px',
                    padding: '20px',
                    border: `1px solid #F1F4F6`,
                    backgroundColor: '#F1F4F6',
                    boxShadow: '0px 4px 8px 0px #6BBBE466',
                    display: 'flex',
                    gap: '33px'
                }}
            >
                <DsSvgIcon component={card.icon}></DsSvgIcon>
                <Typography variant="body2" component="span">
                    {card.text}
                </Typography>
            </Box>
        );
    }


    return (
        <ContainerDesktop
            title="Centro de Información Global"
            description="Estamos emocionados de poner a tu disposición la Biblioteca Virtual de la Comisión Nacional de Libros de Textos Gratuitos (CONALITEG), un recurso valioso para tu formación académica. En esta biblioteca, encontrarás una amplia colección de libros que se han desarrollado pensando en las necesidades particulares de cada uno de tus cursos. Te ofrece una oportunidad única para complementar tus estudios en línea, sus materiales están diseñados específicamente para el nivel de Educación Media Superior, lo que significa que tendrás acceso a contenidos educativos relevantes y de alta calidad, que enriquecerán tu experiencia de aprendizaje."
        >
            <Box
                sx={{...flexColumn, gap: '24px', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%'}}
            >
                <Typography variant="h4" component="h4" sxProps={{ color: '#231F20'}}>
                    Al consultar este material didáctico electrónico, podrás obtener los siguientes beneficios:
                </Typography>
                <Box
                    sx={{                        
                        mb: '15px',
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr', md: 'repeat(2, 1fr)'},
                            gap: { xs: 2, md: 3 },
                            rowGap: 2,
                            columnGap: 3,
                        }}
                >
                    {
                        cards_array.map((card, index) => cards(card, index))
                    }
                </Box>
                <Typography variant="h4" component="h4" color="primary">
                    ¡Accede a la Biblioteca de CONALITEG y abre las puertas a un mundo de conocimiento especialmente diseñado para estudiantes de Preparatoria!
                </Typography>
                <Typography variant="body2" component="span">
                    ¡Enriquece tu aprendizaje y da un paso más hacia tu éxito académico!
                </Typography>
                <Typography variant="body2" component="span">
                    ¡Accede a la Biblioteca de CONALITEG y abre las puertas a un mundo de conocimiento especialmente diseñado para estudiantes de Preparatoria!
                </Typography>
                <Button
                    onClick={() => navigate('/cig/recursos-investigacion')}
                    icon={<ArrowRightAltOutlinedIcon />}
                    iconPosition="end"
                    sxProps={{width: '413px'}}
                >
                    Acceder al centro de Información
                </Button>
            </Box>

            
        </ContainerDesktop>
    );
}

export default CentroInformacionGlobal;