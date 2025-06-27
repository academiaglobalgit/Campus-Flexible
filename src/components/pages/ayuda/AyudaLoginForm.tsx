import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { LogoBox } from "../../atoms/logo/LogoBox";
import Logo from '../../../assets/logo_ag.svg';
import { FormAyuda } from "./FormAyuda";

const AyudaLoginForm: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return(
        <Box
            sx={{
                marginTop: 13,
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMobile ? 'center' : 'flex-start',
                gap: '20px'
            }}
        >
            <LogoBox
                src={Logo}
                alt="AG College Logo"
                sx={{
                    width: '212px'
                }}
            />
            <Typography
                color='primary.main'
                component="h4"
                variant='h4'
                sx={{
                    mt: '20px',
                    mb: '12px',
                    textAlign: isMobile ? 'center' : 'left',
                    textWrap: 'balance'
                }}
                >
                Déjanos tu mensaje y nos contactaremos a la brevedad posible.
            </Typography>
            <FormAyuda />
        </Box>
    );
};

export default AyudaLoginForm;