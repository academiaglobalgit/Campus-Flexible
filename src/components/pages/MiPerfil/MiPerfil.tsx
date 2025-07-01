import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Grid, InputAdornment, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Avatar } from "../../atoms/Avatar/Avatar";
import perfil from '../../../assets/perfil.jpg';
import { Typography } from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useAuth } from "../../../hooks";

import { perfilSchema, type PerfilFormData } from "../../../schemas/perfilSchema";

import {Location as LocationIcon, CheckCircle} from "@iconsCustomizeds";
import { TextMaskCustom } from "../../molecules/TextMask/TextMask";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { AppRoutingPaths, TitleScreen } from "@constants";

import { Calendar, Mail, User, Contacto, WhatsApp, Right } from "../../../assets/icons";
import DsSvgIcon from "../../atoms/Icon/Icon";
import { formatWithIMask } from "../../../utils/Helpers";

const initialData = {
    email: 'joseornelaz@gmail.com', 
    telefono: '(669) 116-6107',
    whatsApp: '',
};

const MiPerfil: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const betweenDevice = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PerfilFormData>({
        resolver: zodResolver(perfilSchema),
        mode: "onChange",
    });

    const currentValues = watch();
    
    const hasChanges = () => {
        return (
            currentValues.email !== initialData.email ||
            currentValues.telefono !== initialData.telefono ||
            currentValues.whatsApp !== initialData.whatsApp
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = initialData;
                // const userData: FormData = await response;
                
                // Actualizar los inputs con los datos de la API
                setValue("email", response.email);
                setValue("telefono", formatWithIMask(response.telefono, "phone"));
                setValue("whatsApp", formatWithIMask(response.whatsApp, "phone"));
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [setValue]);

    const handleEdit = () => {
        alert("Hey");
    };

    const handleLogout = () => {
        logout();
        navigate(AppRoutingPaths.LOGIN);
    }

    const onSubmit = async (data: PerfilFormData) => {
        console.log(data);
    };

    const TextIcon = (text: string, icon: string) => (
        <Typography component="span" variant="body1">
            <Box sx={{display: 'flex', gap: '5px', justifyContent: 'center'}}>
                {text}
                <Box component="img" src={icon} />
            </Box>
        </Typography>
    );

    const Leyenda = (
        <Typography component="span" variant="body1">
            En esta sección podrás ingresar tanto tu información personal como tu información en la empresa. 
            Te recomendamos mantenerla actualizada, con el fin de poder brindarte un mejor servicio. 
            En caso de que tu nombre, estado o municipio estén incorrectos te recomendamos contactar al Centro de Atención y Servicio al Alumno (CASA).
        </Typography>
    );

    const ButtonGuardarCambios = (
      <Button 
          disabled={!hasChanges()} 
          onClick={handleSubmit(onSubmit)} 
          fullWidth 
          icon={ <DsSvgIcon component={Right} color={!hasChanges() ? "inherit" : "white"} /> }
      >Guardar Cambios</Button>
    );

    const ButtonCerrarSesion = (
      <Button onClick={handleLogout} fullWidth icon={<LogoutOutlinedIcon />}>Cerrar Sesión</Button>
    );

    const BotonesSaveLogout = (flexDirection: string = "row") => (
        <Box sx={{ paddingTop: '32px', paddingBottom: '8px', display: 'flex', flexDirection, gap: '15px', justifyContent: 'space-between' }}>
            <>
                {ButtonGuardarCambios}
            </>
            <>
                {ButtonCerrarSesion}
            </>
        </Box>
    );

    const formMiPerfil = (
      <>
        <Divider textAlign="center">
          <Typography component="span" variant="body2" color="primary">Datos Personales</Typography>
        </Divider>
        <TextField
            id="fechaNacimiento"
            label="Fecha Nacimiento"
            placeholder="Ingresa tu Fecha Nacimiento"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Calendar />
                  </InputAdornment>
                ),
              },
            }}
            disabled
        />
        <TextField
            id="email"
            label="Correo Electronico"
            placeholder="Ingresa tu Correo Electronico"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Mail />
                  </InputAdornment>
                ),
              },
            }}
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
        />
        <TextField
            id="idAlumno"
            label="ID Alumno"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <User />
                  </InputAdornment>
                ),
              },
            }}
            disabled
        />
        <TextField
            id="telefono"
            label="Teléfono"
            placeholder="Ingresa tu Teléfono"
            inputMode="numeric"
            slotProps={{
              input: {
                inputComponent: TextMaskCustom as any,
                endAdornment: (
                  <InputAdornment position="end">                    
                      <Contacto />                     
                  </InputAdornment>
                ),
              },
            }}
            {...register("telefono")}
            error={!!errors.telefono}
            helperText={errors.telefono?.message}
        />
        <TextField
            id="whatsApp"
            label="WhatsApp"
            placeholder="WhatsApp"
            inputMode="numeric"
            slotProps={{
              input: {
                inputComponent: TextMaskCustom as any,
                endAdornment: (
                  <InputAdornment position="end">
                      <WhatsApp />
                  </InputAdornment>
                ),
              },
            }}
            {...register("whatsApp")}
            error={!!errors.whatsApp}
            helperText={errors.whatsApp?.message}
        />
        <Divider textAlign="center">
          <Typography component="span" variant="body2" color="primary">Contacto Familiar</Typography>
        </Divider>
        <TextField
            id="telefonoContacto"
            label="Teléfono Contacto"
            placeholder="Ingresa Teléfono de Contacto"
            inputMode="numeric"
            slotProps={{
              input: {
                inputComponent: TextMaskCustom as any,
                endAdornment: (
                  <InputAdornment position="end">
                    <Contacto />
                  </InputAdornment>
                ),
              },
            }}
            {...register("telefonoContacto")}
            error={!!errors.telefonoContacto}
            helperText={errors.telefonoContacto?.message}
        />
      </>
    );

    const AvatarSection = (widthAvatar: number) => (
      <>
        <Avatar src={perfil} width={widthAvatar} height={widthAvatar} isEdit={true} onClick={handleEdit} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '7px'}}>
            <Typography component="h4" variant="h4">Martin Suarez Mora</Typography>
            {TextIcon("Albertflores@gmail.com", CheckCircle)}
            {TextIcon("Aguascalientes, Mexico", LocationIcon)}
        </Box>
      </>
    )

    return (
        isMobile 
        ? 
        <Box sx={{ paddingTop: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px'}}>
            {AvatarSection(96)}
            <Box sx={{ paddingLeft: '25px', paddingRight: '25px', paddingBottom: '30px', width: '100%'}}>
                {ButtonGuardarCambios}
            </Box>
            <Box component="form" sx={{ paddingLeft: '25px', paddingRight: '25px', width: '100%'}}>
                {formMiPerfil}
            </Box>
            <Box sx={{ paddingLeft: '25px', paddingRight: '25px', paddingTop: '20px', paddingBottom: '25px', width: '100%'}}>
                {ButtonCerrarSesion}
            </Box>
        </Box>
      :
      <>
        <Box sx={{ width: { md: '70vw' }, display: 'flex', flexDirection: 'column', gap: '80px'}}>
          <Grid container sx={{ alignItems:'center'}}>
              <Grid size={{md: !betweenDevice ? 8 : 12}}>
                  <TituloIcon Titulo={`${TitleScreen.MI_PERFIL} - Información de contacto`} fontSize="h2" />
                  {Leyenda}
              </Grid>
              <Grid size={{md: !betweenDevice ? 4 : 12}} sx={{ width: betweenDevice ? "100%" : undefined}}>
                  {BotonesSaveLogout(!betweenDevice ? "column" : "row")}
              </Grid>
          </Grid>
          <Grid container>
            <Grid size={{md: 12}} sx={[{display: 'flex', gap: '50px', alignItems: 'center'}, betweenDevice && {flexDirection: 'column'}]}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '30px',
                width: '507px',
                height: '460px',
                borderRadius: '20px',
                backgroundColor: "#F8F8F9" }}
              >
                {AvatarSection(208)}
              </Box>
              <Box
                sx={{ width: '608px'}}
              >
                { formMiPerfil }
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
};

export default MiPerfil;