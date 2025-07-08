import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { Typography } from "../../../atoms/Typography/Typography";
import { Edit1 } from "@iconsCustomizeds";
import { flexColumn } from "@styles";

type GlosarioDialogProps = {
    isOpen?: boolean;
    close: () => void;
}

export const ForosDialog: React.FC<GlosarioDialogProps> = ({isOpen, close}) => {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(isOpen ?? false);
    },[isOpen]);

    const handleClose = () => {
        setOpen(false);
        close();
    };    
    
    return(
        <Dialog isOpen={open} sxProps={{ width: '350px' }} >
            <Box 
                sx={[
                    { ...flexColumn, alignItems: 'flex-start', padding: '20px', gap: '16px' },
                ]}
            >
                <Typography component="h4" variant="h4" children="Comentario de tema de conversación" color="primary" />
                <Typography component="span" variant="body1" >
                    Participa en el foro enviando imágenes que demuestren que ya tienes acceso a las siguientes herramientas en su versión de prueba:
                    <ul>
                        <li>Sistema operativo Linux</li>
                    </ul>
                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        height: '281px',
                        border: `1px solid #AAB1B6`,
                        borderRadius: '8px',
                        backgroundColor: '#FFF',
                    }}
                >
                </Box>
                <Box sx={{ ...flexColumn, gap: '16px', width: '100%' }}>
                    <Button 
                        fullWidth
                        onClick={handleClose}
                        icon={<Edit1 />}
                    >
                        Comentar
                    </Button>
                    <Button 
                        fullWidth
                        onClick={handleClose}
                        variant="outlined"
                        color="error"
                    >
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
}