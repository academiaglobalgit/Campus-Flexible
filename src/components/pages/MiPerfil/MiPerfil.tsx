import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMask } from "react-imask";

import { Avatar } from "../../atoms/Avatar/Avatar";
import perfil from '../../../assets/perfil.jpg';
import { Typography } from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useAuth } from "../../../hooks";

import { perfilSchema, type PerfilFormData } from "../../../schemas/perfilSchema";

import {Location as LocationIcon, CheckCircle} from "@iconsCustomizeds";
import { TextMaskCustom } from "../../molecules/TextMask/TextMask";

const initialData = {
    email: 'joseornelaz@gmail.com', 
    telefono: '(669) 116-6107'
};

const formatWithIMask = (value: string): string => {
  const mask = IMask.createMask({
    mask: "(000) 000-0000", // Máscara deseada
  });
  mask.resolve(value); // Aplica la máscara
  return mask.value; // Devuelve el valor formateado
};

const MiPerfil: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PerfilFormData>({
        resolver: zodResolver(perfilSchema),
        mode: "onChange",
    });

    const currentValues = watch();
    
    const hasChanges = () => {
        return (
            currentValues.email !== initialData.email ||
            currentValues.telefono !== initialData.telefono
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = initialData;
                // const userData: FormData = await response;
                
                // Actualizar los inputs con los datos de la API
                setValue("email", response.email);
                setValue("telefono", formatWithIMask(response.telefono));
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [setValue]); // Dependencia: setValue

    const handleEdit = () => {
        alert("Hey");
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
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
    )

    return (
        
        <Box sx={{ paddingTop: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px'}}>
            <Avatar src={perfil} width={96} height={96} isEdit={true} onClick={handleEdit} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '7px'}}>
                <Typography component="h4" variant="h4">Martin Suarez Mora</Typography>
                {TextIcon("Albertflores@gmail.com", CheckCircle)}
                {TextIcon("Aguascalientes, Mexico", LocationIcon)}
            </Box>
            <Box sx={{ paddingLeft: '25px', paddingRight: '25px', paddingBottom: '30px', width: '100%'}}>
                <Button 
                    disabled={!hasChanges()} 
                    onClick={handleSubmit(onSubmit)} 
                    fullWidth 
                    icon={<CloudUploadOutlinedIcon />}
                >Guardar Cambios</Button>
            </Box>
            <Box component="form" sx={{ paddingLeft: '25px', paddingRight: '25px', width: '100%'}}>
                <TextField
                    id="fechaNacimiento"
                    label="Fecha Nacimiento"
                    placeholder="Ingresa tu Fecha Nacimiento"
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <CalendarMonthOutlinedIcon />
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
                            <EmailOutlinedIcon />
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
                            <PersonOutlineOutlinedIcon />
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
                    slotProps={{
                      input: {
                        inputComponent: TextMaskCustom as any,
                        endAdornment: (
                          <InputAdornment position="end">
                            <PhoneInTalkOutlinedIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                    {...register("telefono")}
                    error={!!errors.telefono}
                    helperText={errors.telefono?.message}
                />
            </Box>
            <Box sx={{ paddingLeft: '25px', paddingRight: '25px', paddingTop: '20px', width: '100%'}}>
                <Button onClick={handleLogout} fullWidth icon={<LogoutOutlinedIcon />}>Cerrar Sesión</Button>
            </Box>
        </Box>
    );
};

export default MiPerfil;