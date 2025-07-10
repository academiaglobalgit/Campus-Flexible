import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { Typography } from "../../../atoms/Typography/Typography";
import { Edit1 } from "@iconsCustomizeds";
import { flexColumn } from "@styles";
import RichText from "../../RichText/RichText";

type ForosDialogProps = {
    type: 'Comentar' | 'Editar' | 'Responder';
    data?: {tema: string, comentario: string} | null;
    isOpen?: boolean;
    close: () => void;
    save?: () => string;
}

export const ForosDialog: React.FC<ForosDialogProps> = ({type, data, isOpen, close, save}) => {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');

    useEffect(() => {
        setOpen(isOpen ?? false);
    },[isOpen]);

    useEffect(() => {
        switch (type) {
            case 'Comentar':
                setTitle('Comentario de tema de conversación');
                break;
            case 'Editar':
                setTitle('Editar Comentario');
                break;
            case 'Responder':
                setTitle('Responder a: comentario');
                break;
        }
    },[type]);

    const typeButton = () => {
        switch (type) {
            case 'Comentar':
                return (
                    <Button fullWidth onClick={handleSave} icon={<Edit1 />}>
                        Comentar
                    </Button>
                );
            case 'Editar':
                return (
                    <Button fullWidth onClick={handleSave}>
                        Guardar
                    </Button>
                );
            case 'Responder':
                return (
                    <Button fullWidth onClick={handleSave}>
                        Responder
                    </Button>
                );
        }
    };

    const handleClose = () => {
        setOpen(false);
        close();
    };

    const handleSave = () => {
        setOpen(false);
        if (save) {
            save();
        }
    };
    
    return(
        <Dialog isOpen={open} sxProps={{ width: '350px' }} >
            <Box 
                sx={[
                    { ...flexColumn, alignItems: 'flex-start', padding: '20px', gap: '16px' },
                ]}
            >
                <Typography component="h4" variant="h4" children={title} color="primary" />
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
                        backgroundColor: '#FFF',
                    }}
                >
                        <RichText />
                </Box>
                <Box sx={{ ...flexColumn, gap: '16px', width: '100%' }}>
                    { typeButton() }
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