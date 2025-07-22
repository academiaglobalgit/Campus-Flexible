import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { Edit1 } from "@iconsCustomizeds";
import { flexColumn } from "@styles";
import RichText from "../../RichText/RichText";

type ComentariosDialogProps = {
    type: 'Comentar' | 'Editar' | 'Responder';
    data?: { tema: string, comentario: string } | null;
    isOpen?: boolean;
    textAcccion?: { autor: string; mensaje?: string };
    close: () => void;
    save?: (data: { htmlContent: string, type: string }) => void;
}

export const ComentariosDialog: React.FC<ComentariosDialogProps> = ({ type, isOpen, close, save, textAcccion }) => {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [htmlContent, setHtmlContent] = React.useState("");
    const [value, setHtmlContentEdit] = React.useState("");

    useEffect(() => {
        setOpen(isOpen ?? false);
    }, [isOpen]);

    useEffect(() => {
        switch (type) {
            case 'Comentar':
                setTitle('Comentario de tema de conversación');
                break;
            case 'Editar':
                setTitle('Editar Comentario');
                break;
            case 'Responder':
                setTitle(`Responder a: ${textAcccion?.autor}`);
                break;
        }
    }, [type]);

    useEffect(() => {
        if (isOpen && textAcccion && type === 'Editar') {
            setHtmlContentEdit(textAcccion.mensaje ?? "");
        }
    }, [isOpen, textAcccion]);

    useEffect(() => {
        if (!isOpen && textAcccion) {
            setHtmlContentEdit("");
        }
    }, [isOpen, textAcccion]);


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
            save({ htmlContent, type });
        }
    };

    return (
        <Dialog isOpen={open} sxProps={{ width: '350px' }} >
            <Box
                sx={[
                    { ...flexColumn, alignItems: 'flex-start', padding: '20px', gap: '16px' },
                ]}
            >
                <Typography component="h4" variant="h4" children={title} color="primary" />

                <Typography component="span" variant="body1" dangerouslySetInnerHTML={{ __html: type === 'Responder' ? String(textAcccion?.mensaje || '') : '' }}
                >

                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        height: '281px',
                        backgroundColor: '#FFF',
                    }}
                >
                    <RichText value={value} onChange={(html) => setHtmlContent(html)} />                </Box>
                <Box sx={{ ...flexColumn, gap: '16px', width: '100%' }}>
                    {typeButton()}
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