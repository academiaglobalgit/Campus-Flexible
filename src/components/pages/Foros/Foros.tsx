import { Box, FormControl, InputLabel, MenuItem, Pagination, Select, useMediaQuery, useTheme } from "@mui/material";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import {Foros as ForosIcon, Edit1 } from "@iconsCustomizeds";
import { DividerSection } from "../../molecules/DividerSection/DividerSection";
import { Typography } from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import { Controller, useForm } from "react-hook-form";
import { foroSchema, type ForoData } from "../../../schemas/foroSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { flexColumn, flexRows } from "@styles";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { ForosDialog } from "../../molecules/Dialogs/ForosDialog/ForosDialog";
import React from "react";

const Foros: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [isOpenForosDialog, setIsOpenForosDialog] = React.useState(false);

    const comentarios = [{ id: 0, label: 'Todos los comentarios' }];
    const ordenar = [{ id: 0, label: 'Más actuales' }];
    const limite = [{ id: 0, label: '2' }];

    const { control, register, handleSubmit, formState: { errors } } = useForm<ForoData>({
            resolver: zodResolver(foroSchema(comentarios.map((m) => m.id), ordenar.map((t) => t.id), limite.map((t) => t.id))),
            defaultValues: {
                comentarios: 0,
                ordenar: 0,
                limite: 0,
            },
    });

    const ComentarButtonSection = () => {
        return(
            <Box>
                <DividerSection Title="Foro 1" />
                <Typography component="span" variant="body1" >
                    Participa en el foro enviando imágenes que demuestren que ya tienes acceso a las siguientes herramientas en su versión de prueba:
                    <ul>
                        <li>Sistema operativo Linux</li>
                    </ul>
                </Typography>
                <Box sx={{ width: '100%', mt: '32px' }}>
                    <Button 
                        fullWidth
                        onClick={() => setIsOpenForosDialog(true)}
                        icon={<Edit1 />}
                    >
                        Comentar
                    </Button>
                </Box>
            </Box>
        );
    }


    const ComentariosCard = () => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', pb: '20px' }}>
                <Box 
                    sx={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#F1F4F6', padding: '8px 15px 8px 15px', borderBottom: '1px solid #AAB1B6', borderRadius: '4px 4px 0px 0px' }}>
                    <Avatar
                        src="https://i.pravatar.cc/150?img=3"
                        alt="Avatar"
                        width={48}
                        height={48}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography component="span" variant="body2">
                            Martín Sánchez
                        </Typography>
                        <Typography component="span" variant="body1" color="disabled">
                            26/Junio/2025 12:00:00PM
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{...flexColumn, alignItems: 'flex-start',  gap: '10px', p: '15px', backgroundColor: '#F8F8F9', width: '100%', height: '100px', borderRadius: '0px 0px 4px 4px' }}
                >
                    <Typography component="span" variant="body2">
                        Este es un comentario de prueba
                    </Typography>
                    <Box sx={{ display:'flex', gap: '15px', width: '100%' }}>
                        <><Button 
                            fullWidth
                            onClick={() => {}} 
                            variant="outlined"
                            sxProps={{ height: '26px' }}
                        >Editar</Button></>
                        <><Button fullWidth onClick={() => {}} variant="outlined" color="error" sxProps={{ height: '26px' }}>Eliminar</Button></>
                    </Box>
                </Box>
            </Box>
        );
    }

    const DiscusionSection = (flexDirection = 'column') => {
        return(
            <Box sx={{ mt: '46px' }}>
                <DividerSection Title="Discusión" />
                <Box sx={{ display: 'flex', flexDirection, gap: '20px', pb: '20px' }}>
                    <Controller
                        name="comentarios"
                        control={control}
                        render={({ field }) => (
                            <FormControl 
                                fullWidth 
                                error={!!errors.comentarios}
                            >
                            <InputLabel id="mostrar-label">Mostrar</InputLabel>
                            <Select
                                labelId="mostrar-label"
                                label="Mostrar"
                                {...field}
                            >
                                {comentarios.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="ordenar"
                        control={control}
                        render={({ field }) => (
                            <FormControl 
                                fullWidth 
                                error={!!errors.ordenar}
                            >
                            <InputLabel id="ordenar-label">Ordenar por</InputLabel>
                            <Select
                                labelId="ordenar-label"
                                label="Ordenar por"
                                {...field}
                            >
                                {ordenar.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="limite"
                        control={control}
                        render={({ field }) => (
                            <FormControl 
                                fullWidth 
                                error={!!errors.limite}
                            >
                            <InputLabel id="limite-label">Limite de resultados</InputLabel>
                            <Select
                                labelId="limite-label"
                                label="Limite de resultados"
                                {...field}
                            >
                                {limite.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        )}
                    />
                </Box>
            </Box>
        )
    }

    const PaginationSection = () => {
        return (
            <Box sx={{...flexRows, pb: 3 }}>
                <Pagination count={10} shape="rounded" />
            </Box>
        );
    }

  return (
    <>
        {
            isMobile 
                ?
                    <>
                        <TituloIcon Titulo="Foros" Icon={ForosIcon} />
                        <ComentarButtonSection />
                        {DiscusionSection()}
                        <ComentariosCard />
                        <PaginationSection />
                    </>
                :
                    <ContainerDesktop title="Foros">
                        <ComentarButtonSection />
                        {DiscusionSection('row')}
                        <ComentariosCard />
                        <PaginationSection />
                    </ContainerDesktop>
        }
        <ForosDialog isOpen={isOpenForosDialog} close={() => setIsOpenForosDialog(false)} type="Comentar" />
    </>
    
  );
}

export default Foros;