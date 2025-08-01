import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Grid, InputAdornment, Skeleton, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { Avatar } from "../../atoms/Avatar/Avatar";
import { Typography } from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useAuth } from "../../../hooks";

import { perfilSchema, type PerfilFormData } from "../../../schemas/perfilSchema";

import {Location as LocationIcon, CheckCircle} from "@iconsCustomizeds";
import { TextMaskCustom } from "../../molecules/TextMask/TextMask";
import { AppRoutingPaths, TitleScreen, type PerfilResponse, type User } from "@constants";

import { Calendar, Mail, User as IUser, Contacto, WhatsApp, Right } from "../../../assets/icons";
import DsSvgIcon from "../../atoms/Icon/Icon";
import { formatWithIMask } from "../../../utils/Helpers";
import { useGetPerfilUsuario } from "../../../services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { useNotification } from "../../../providers/NotificationProvider";
import { useCreatePerfil } from "../../../services/PerfilService";
import { UploadImagePerfilDialog } from "../../molecules/Dialogs/UploadImagePerfilDialog/UploadImagePerfilDialog";

import lodash from 'lodash';
import { setAuthModel } from "../../../hooks/useLocalStorage";
import { flexColumn } from "@styles";
import type { PreviewFile } from "../../../types/Perfil.interface";
import { encryptData } from "../../../utils/crypto";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";

const MiPerfil: React.FC = () => {
    const { logout, user, setUser } = useAuth();
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [loading, setLoading] = React.useState(false);
    const [loadingData, setLoadingData] = React.useState(false);
    const [openUploadImage, setOpenUploadImage] = React.useState(false);
    const [showCancelEditAvatar, setShowCancelEditAvatar] = React.useState(false);

    const [perfil, setPerfil] = React.useState<PerfilResponse | undefined>(undefined);
    const [newImage, setNewImage] = React.useState<PreviewFile | null>(null);

    const { refetch } = useGetPerfilUsuario("MiPerfil", { enabled: false });

    const betweenDevice = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<PerfilFormData>({
        resolver: zodResolver(perfilSchema),
        mode: "onChange",
    });

    const [initialData, setInitialData] = React.useState<{email: string, telefono: string, telefonoContacto: string, whatsApp: string }>({
      email: '', 
      telefono: '',
      telefonoContacto: '',
      whatsApp: '',
    });

    const [avatar, setAvatar] = React.useState(user?.photo);
    const [nombre, setNombre] = React.useState(user?.name);
    const [email, setEmail] = React.useState(user?.email);
    const [ciudad, setCiudad] = React.useState(user?.city);

    const currentValues = watch();

    const hasChanges = () => {
        // Validaciones de número telefónico (10 dígitos numéricos)
        const isInvalidPhone = (value?: string) => value && value.replace(/\D/g, '').length !== 10;

        if (isInvalidPhone(currentValues.telefono)) return false;
        if (isInvalidPhone(currentValues.whatsApp)) return false;
        if (isInvalidPhone(currentValues.telefonoContacto)) return false;

        const cValues = {
            email: currentValues.email,
            telefono: currentValues.telefono,
            telefonoContacto: currentValues.telefonoContacto,
            whatsApp: currentValues.whatsApp,
        };

        const formChanged = !lodash.isEqual(cValues, initialData);
        const imageChanged = newImage !== null;

        return formChanged || imageChanged;
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingData(true);
                const response = await refetch();
                const perfil = response.data?.data;

                setPerfil(response.data);

                setNombre(`${perfil?.nombre} ${perfil?.apellido_paterno} ${perfil?.apellido_materno}`);
                setEmail(perfil?.correo ?? '');
                setCiudad(`${perfil?.nombre_ciudad}, ${perfil?.nombre_pais}`);

                const telefono = formatWithIMask(perfil?.telefonos?.find((item) => item.tipo === "Celular")?.numero ?? "", "phone");
                const whatsApp = formatWithIMask(perfil?.telefonos?.find((item) => item.tipo === "Whatsapp")?.numero ?? "", "phone");
                const telefonoContacto = formatWithIMask(perfil?.telefonos?.find((item) => item.tipo === "Emergencia")?.numero ?? "", "phone");

                setValue("email", email ?? '');
                setValue("matricula", perfil?.matricula ?? '');
                setValue("fechaNacimiento", format(new Date(perfil?.fecha_nacimiento ?? ''), "dd/MM/yyyy"));
                setValue("telefono", telefono);
                setValue("whatsApp", whatsApp);
                setValue("telefonoContacto", telefonoContacto);

                setInitialData({email: email ?? '',telefono,whatsApp,telefonoContacto});

                setAvatar(perfil?.foto_perfil_url ?? "");
                setLoadingData(false);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [setValue, email, refetch]);

    const handleEdit = () => {
        setOpenUploadImage(true);
    };

    const handleLogout = () => {
        logout();
        navigate(AppRoutingPaths.LOGIN);
    }

    const onSubmit = async (data: PerfilFormData) => {
        setLoading(true);
        const telefono = perfil?.data.telefonos?.find((item) => item.tipo === "Celular");
        const whatsApp = perfil?.data.telefonos?.find((item) => item.tipo === "Whatsapp");
        const telefonoContacto = perfil?.data.telefonos?.find((item) => item.tipo === "Emergencia");

        const telefonos = [
          {
            id_telefono: telefono?.id_telefono, //Actualizar Telefono
            numero: data.telefono.replace(/\D/g, "")
          },
          {
            id_telefono: whatsApp?.id_telefono, //Actualizar Telefono
            numero: data.whatsApp.replace(/\D/g, "")
          },
          {
            id_telefono: telefonoContacto?.id_telefono, //Actualizar Telefono
            numero: data.telefonoContacto.replace(/\D/g, "")
          }
        ];

        const payload = {
            correo: data.email,
            foto_perfil_url: newImage !== null ? newImage.file : null,
            telefonos: telefonos,
        }

        createMutation.mutate(payload);
    };

    const createMutation = useMutation({
        mutationFn: useCreatePerfil,
        onSuccess: async () => {
            showNotification(`Perfil actualizado satisfactorimente`,"success");
            setNewImage(null);
            setShowCancelEditAvatar(false);
            setLoading(false);

            setInitialData({
                email: currentValues.email,
                telefono: currentValues.telefono,
                telefonoContacto: currentValues.telefonoContacto,
                whatsApp: currentValues.whatsApp,
            });

            const perfil = await refetch();
            if(perfil) {
              const auth: User = {
                ...user,
                name: `${perfil.data?.data.nombre} ${perfil.data?.data.apellido_paterno} ${perfil.data?.data.apellido_materno}`,
                email: perfil.data?.data.correo ?? "",
                photo: perfil.data?.data.foto_perfil_url ?? "",
                city: `${perfil.data?.data.nombre_ciudad}`,
                phone: perfil?.data?.data.telefonos?.find((item) => item.tipo === "Celular")?.numero ?? "0000000000",
                perfil: perfil?.data?.data,
              };
              setUser(auth);
              const encry = await encryptData(auth);
              setAuthModel(encry);
            }
        },
        onError: (error) => {
            showNotification(`Error al registrar: ${error.message}`, "error");
            setLoading(false);
        },
        onSettled: () => {
            console.log('La mutación ha finalizado');
        }
    });

    const handleImage = (file: PreviewFile | null) => {
        setOpenUploadImage(false);

        if(file) {
          setNewImage(file);
          setShowCancelEditAvatar(true);
          setAvatar(file.preview);
        }
    }

    const handleCanceEditAvatar = () => {
        setAvatar(user?.photo);
        setShowCancelEditAvatar(false);
        setNewImage(null);
    }

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
          isLoading={loading}
      >Guardar Cambios</Button>
    );

    const ButtonCerrarSesion = (
      <Button onClick={handleLogout} fullWidth icon={<LogoutOutlinedIcon />}>Cerrar Sesión</Button>
    );

    const BotonesSaveLogout = (flexDirection: string = "row") => (
        <Box sx={{ paddingBottom: '8px', display: 'flex', flexDirection, gap: '15px', justifyContent: 'space-between' }}>
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
        {
          loadingData
          ?
            <Box
              sx={{...flexColumn}}  
            >
              {
                Array.from({ length: 5}).map((_,i) => <Skeleton key={i} animation="wave" height="70px" width="100%" />)
              }
            </Box>
          :
          <>
            <Controller
            name="fechaNacimiento"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                id="fechaNacimiento"
                label="Fecha Nacimiento"
                error={!!errors.fechaNacimiento}
                helperText={errors.fechaNacimiento?.message}
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
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                id="email"
                label="Correo Electrónico"
                placeholder="Ingresa tu Correo Electrónico"
                error={!!errors.email}
                helperText={errors.email?.message}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <Mail />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
          <Controller
            name="matricula"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                id="matricula"
                label="Matricula"
                error={!!errors.matricula}
                helperText={errors.matricula?.message}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IUser />
                      </InputAdornment>
                    ),
                  },
                }}
                disabled
              />
            )}
          />
          <Controller
            name="telefono"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Teléfono"
                placeholder="Teléfono"
                inputMode="numeric"
                error={!!errors.telefono}
                helperText={errors.telefono?.message}
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
              />
            )}
          />
          <Controller
            name="whatsApp"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="WhatsApp"
                placeholder="WhatsApp"
                inputMode="numeric"
                error={!!errors.whatsApp}
                helperText={errors.whatsApp?.message}
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
              />
            )}
          />
          </>
        }
        
        <Divider textAlign="center">
          <Typography component="span" variant="body2" color="primary">Contacto Familiar</Typography>
        </Divider>
        {
          loadingData
          ?
            <Skeleton animation="wave" height="70px" width="100%" />
          :
          <Controller
            name="telefonoContacto"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Teléfono Contacto"
                placeholder="Ingresa Teléfono de Contacto"
                inputMode="numeric"
                error={!!errors.telefonoContacto}
                helperText={errors.telefonoContacto?.message}
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
              />
            )}
          />
        }
          
      </>
    );

    const AvatarSection = (widthAvatar: number) => (
      <>
        <Avatar 
          src={avatar} 
          alt={nombre} 
          width={widthAvatar} 
          height={widthAvatar} 
          isEdit={true}
          showCancelEdit={showCancelEditAvatar} 
          onClick={handleEdit}
          onCancelEdit={handleCanceEditAvatar}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '7px'}}>
            <Typography component="h4" variant="h4">{nombre}</Typography>
            {TextIcon(email ?? '', CheckCircle)}
            {TextIcon(ciudad ?? '', LocationIcon)}
        </Box>
      </>
    )

    return (
      <>
      {
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
        <ContainerDesktop title={`${TitleScreen.MI_PERFIL} - Información de contacto`}>
          <Grid container sx={{ alignItems:'center'}}>
            <Grid size={{md: !betweenDevice ? 8 : 12}}>
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
        </ContainerDesktop>
      }
      <UploadImagePerfilDialog isOpen={openUploadImage} close={(val) => handleImage(val)} />
      </>
    );
};

export default MiPerfil;