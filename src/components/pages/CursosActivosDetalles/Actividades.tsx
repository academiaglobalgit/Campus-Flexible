import { useRef, useState } from "react";
import { Box, TextField, useMediaQuery, useTheme } from "@mui/material";
import Button from "../../atoms/Button/Button";
import { Accordion } from "../../molecules/Accordion/Accordion";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { accordionStyle, flexColumn, flexRows } from "@styles";
import { useParams } from "react-router-dom";
import { useGetCursosTabs } from "../../../services/CursosActivosService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { toRoman } from "../../../utils/Helpers";
import { Typography } from "../../atoms/Typography/Typography";
import { FileUploader } from "../../molecules/FileUploader/FileUploader";


type PreviewFile = {
  file: File;
  preview?: string;
};

export const Actividades: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const betweenDevice = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const {id} = useParams<{id:string}>();    
    const { data: actividad, isLoading } = useGetCursosTabs(Number(id!), "Actividades");
    const [archivos, setArchivos] = useState<PreviewFile[]>([]);

    const [archivosPorId, setArchivosPorId] = useState<Record<number, PreviewFile[]>>({});

    const handleFilesChange = (id: number, files: PreviewFile[]) => {
        setArchivosPorId((prev) => ({
        ...prev,
        [id]: files,
        }));
    };

    const handleSaveActivity = (id: number, ) => {
        const archivos = archivosPorId[id] || [];
    // Aquí puedes hacer una llamada a la API con archivos
    console.log(`Guardando archivos del Accordion ${id}`, archivos);
        // const formData = new FormData();
        // archivos.forEach((archivo) => formData.append('files', archivo.file));

        // Envíalo a tu backend
        // await fetch('/api/upload', {
        // method: 'POST',
        // body: formData,
        // });
    }

    const UploadButton = () => {
        const fileInputRef = useRef<HTMLInputElement>(null);

        const handleClick = () => {
            fileInputRef.current?.click();
        };

        return (
            <>
                <Button
                    variant="text"
                    onClick={handleClick}
                    icon={<FileUploadIcon />}
                    iconPosition={'start'}
                >
                    Subir archivo…
                </Button>

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    multiple
                    onChange={(event) => console.log(event.target.files)}
                />
            </>
        );
    };
    
    const ButtonSection = (isDesktop: boolean = true) => (
        <Box
            sx={
                [
                    { width: '100%' },
                    isDesktop && {...flexRows, gap: '30px', mb: '25px' },
                    !isDesktop && {...flexColumn, gap: '18px', pb: 4 }
                ]
            }
        >
            <Box sx={{ width: isDesktop ? '300px' : '100%'}}>
                    <Button onClick={() => { }} fullWidth >Instrumento de Evaluación</Button>
            </Box>
            <Box sx={{ width: isDesktop ? '150px' : '100%'}}>
                <Button onClick={() => { }} fullWidth >Portada</Button>
            </Box>
            <Box sx={{ width: isDesktop ? '300px' : '100%'}}>
                <Button onClick={() => { }} fullWidth >Manual de Formato APA</Button>
            </Box>
            <Box sx={{ width: isDesktop ? '340px' : '100%'}}>
                <Button onClick={() => { }} fullWidth >Manual de Actividades Integradoras</Button>
            </Box>
        </Box>
    );

    return (
        <>
            {
                isMobile
                ?
                    ButtonSection(!isMobile)
                :
                    ButtonSection(betweenDevice ? false : true)
            }
            {
                isLoading 
                ?
                <LoadingCircular Text="Cargando Actividades..." />
                :
                Object.entries(actividad).map(([unidad, contenidos], index) =>
                    <Accordion key={index} title={`Unidad ${toRoman(Number(unidad))}`} sxProps={accordionStyle}>
                        {
                            contenidos.filter((item) => item.unidad === Number(unidad)).map((item, i) => (
                                <Box 
                                        key={i}>
                                    <Box                                         
                                        dangerouslySetInnerHTML={{ __html: item.contenido_elemento }} 
                                        sx={{
                                            '& h1, h2':{
                                                font: theme.typography.h4
                                            },
                                            '& h1, h2, h3': {
                                                color: 'primary.main',
                                            },
                                            '& p': {
                                                marginBottom: '1rem',
                                                lineHeight: 1.6,
                                                color: 'text.primary'
                                            },
                                            '& ul': {
                                                paddingLeft: '1.5rem',
                                                listStyleType: 'disc',
                                            },
                                            pl: 3, pr: 3
                                        }}
                                    />
                                    <Box sx={{pl: 3, pr: 3, pb: 3}}>
                                        <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.main, fontFamily: theme.typography.fontFamily }}>
                                            Entrega de actividad
                                        </Typography>
                                        <Box sx={{pt: 2}}>
                                            <TextField                                                                                        
                                                placeholder="Text"
                                                label="Comentario"
                                                multiline
                                                rows={3}
                                                slotProps={{
                                                    input: {
                                                        inputProps: {
                                                            maxLength: 200
                                                        },
                                                    },
                                                }}
                                            />
                                            <Typography component="p" variant="body1" sxProps={{ color: theme.palette.grey[200], fontFamily: theme.typography.fontFamily, textAlign: 'right' }}>
                                                0/200
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', width: '100%', gap: '8px' }}>
                                            <Typography component="p" variant="body1" color="primary">
                                                Sube tu archivo aquí
                                            </Typography>
                                            <Typography component="p" variant="body1">
                                                    (pdf. xml. word, ppt)
                                            </Typography>
                                        </Box>

                                        {/* {
                                            UploadButton()
                                        } */}

                                        <FileUploader                                              
                                            files={archivosPorId[item.id_curso] || []}
                                            onFilesChange={(files) => handleFilesChange(item.id_curso, files)}
                                            maxFiles={3} maxFileSizeMb={3}/>

                                        <Button
                                            fullWidth
                                            onClick={() => handleSaveActivity(item.id_curso)}
                                        >
                                            Finalizar Actividad
                                        </Button>
                                    </Box>
                                </Box>
                            ))
                        }
                        
                    </Accordion>      
                )
            }
        </>
    );
};