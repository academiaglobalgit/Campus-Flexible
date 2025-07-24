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
    textAccion?: { autor: string; mensaje?: string };
    close: () => void;
    save?: (data: { htmlContent: string, type: string }) => void;
}

export const ComentariosDialog: React.FC<ComentariosDialogProps> = ({ type, isOpen, close, save, textAccion }) => {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [htmlContent, setHtmlContent] = React.useState("");
    const [value, setHtmlContentEdit] = React.useState("");
    const [isDisabled, setIsDisabled] = React.useState(true);

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
                setTitle(`Responder a: ${textAccion?.autor}`);
                break;
        }
    }, [type, textAccion]);

    useEffect(() => {
        if (isOpen && textAccion && type === 'Editar') {
            setHtmlContentEdit(textAccion.mensaje ?? "");
        } else if (!isOpen && textAccion) {
            setHtmlContentEdit("");
        }
    }, [isOpen, textAccion, type]);

    useEffect(() => {
        setIsDisabled(htmlContent === "");
    },[htmlContent]);


    const typeButton = () => {
        switch (type) {
            case 'Comentar':
                return (
                    <Button fullWidth onClick={handleSave} icon={<Edit1 />} disabled={isDisabled}>
                        Comentar
                    </Button>
                );
            case 'Editar':
                return (
                    <Button fullWidth onClick={handleSave} disabled={isDisabled}>
                        Guardar
                    </Button>
                );
            case 'Responder':
                return (
                    <Button fullWidth onClick={handleSave} disabled={isDisabled}>
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
        if(htmlContent === "") return;
        setOpen(false);
        if (save) {
            save({ htmlContent, type });
        }
    };

    const handleHTMLContent = (html: string) => {
        setHtmlContent(html !== '<p></p>' ? html : '');
    }

    return (
        <Dialog isOpen={open} sxProps={{ width: '350px' }} >
            <Box
                sx={[
                    { ...flexColumn, alignItems: 'flex-start', padding: '20px', gap: '16px' },
                ]}
            >
                <Typography component="h4" variant="h4" children={title} color="primary" />

                <Typography component="span" variant="body1" dangerouslySetInnerHTML={{ __html: type === 'Responder' ? String(textAccion?.mensaje || '') : '' }}
                >

                </Typography>
                <Box
                    sx={{
                        width: '100%',
                        height: '281px',
                        backgroundColor: '#FFF',
                    }}
                >
                    <RichText value={value} onChange={(html) => handleHTMLContent(html)} />
                </Box>
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