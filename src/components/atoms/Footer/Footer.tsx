import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { loadConfig } from "../../../config/configStorage";

export const Footer: React.FC = () => {

    const [config, setConfig] = React.useState<any>(null);

    React.useEffect(() => {
        loadConfig().then(cfg => {
            setConfig(cfg);
        });
    },[]);

    return (
        <Box sx={{ color: '#231F20', mt: 2.5, mb: 4, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography 
                variant="body1"
                component="footer" 
                dangerouslySetInnerHTML={{ __html: config?.data.copyright }} 
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Link href={config?.data.url_pdf} target="_blank">Ver aviso de privacidad</Link>
            </Box>
        </Box>
    );
};
