import React, { useEffect } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { Edit1 } from "@iconsCustomizeds";
import { flexColumn } from "@styles";
import RichText from "../../RichText/RichText";
import type { RichTextEditorRef } from "mui-tiptap";
import theme from "../../../../themes/theme";

type ComentariosDialogProps = {
    type: 'Comentar' | 'Editar' | 'Responder';
    data?: { tema: string, comentario: string } | null;
    isOpen?: boolean;
    textAccion?: { autor: string; mensaje?: string };
    close: () => void;
    save?: (data: { htmlContent: string, type: string }) => void;
}

export const ComentariosDialog: React.FC<ComentariosDialogProps> = ({ type, isOpen, close, save, textAccion }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');

    const [initialContent, setInitialContent] = React.useState<string | null>(null);
    const [isDisabled, setIsDisabled] = React.useState(true);

    const editorRef = React.useRef<RichTextEditorRef>(null);

    const [expandido, setExpandido] = React.useState(false);
    const limiteCaracteres = 400;

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
                setIsDisabled(true);
                break;
        }
    }, [type, textAccion]);

    useEffect(() => {
        if (isOpen && textAccion && type === 'Editar') {
            setInitialContent(textAccion.mensaje ?? "");
            setIsDisabled(false);
        } else if (!isOpen && textAccion) {
            setInitialContent("");
        }
    }, [isOpen, textAccion, type]);

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
        const html = editorRef.current?.editor?.getHTML() || "";
        if (html === "") return;
        setOpen(false);
        if (save) {
            save({ htmlContent: html, type });
        }
    };
    const handleHTMLContent = (html: string) => {
        setTimeout(() => setIsDisabled(html === '<p></p>'), 50);
    }

    const textoMostrar = expandido
        ? textAccion?.mensaje ?? ""
        : (textAccion?.mensaje?.slice(0, limiteCaracteres) ?? "") +
        ((textAccion?.mensaje?.length ?? 0) > limiteCaracteres ? "..." : "");

    return (
        <Dialog isOpen={open} sxProps={{ width: isMobile ? '350px' : '768px' }} >
            <Box
                sx={[
                    { ...flexColumn, alignItems: 'flex-start', padding: '20px', gap: '16px' },
                ]}
            >
                <Typography component="h4" variant="h4" children={title} color="primary" />

                <Box sx={{ maxHeight: '250px', overflow: 'auto' }}>

                    <Typography component="span" variant="body1" dangerouslySetInnerHTML={{ __html: type === 'Responder' || type === 'Comentar' ? String(textoMostrar || '') : '' }}
                    >

                    </Typography>
                </Box>
                    {(textAccion?.mensaje?.length ?? 0) > limiteCaracteres && (
                        <Typography
                            component="span"
                            variant="body3"
                            color="primary"
                            onClick={() => setExpandido(!expandido)}
                            sx={{ cursor: 'pointer' }}
                        >
                            {expandido ? "Ver menos" : "Ver más"}
                        </Typography>
                    )}

                <Box
                    sx={{
                        width: '100%',
                        height: '281px',
                        backgroundColor: '#FFF',
                    }}
                >
                    <RichText ref={editorRef} value={initialContent} onChange={handleHTMLContent} />
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