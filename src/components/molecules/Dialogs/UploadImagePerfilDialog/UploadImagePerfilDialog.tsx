import { Box, Button, DialogContent, styled } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { CircleStencil, Cropper, type CropperRef } from "react-advanced-cropper";
import 'react-advanced-cropper/dist/style.css';
import type { PreviewFile } from "../../../../types/Perfil.interface";

type UploadDialogProps = {
    isOpen?: boolean;
    close?: (file: PreviewFile | null) => void;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const UploadImagePerfilDialog: React.FC<UploadDialogProps> = ({ isOpen, close }) => {
    const [open, setOpen] = React.useState(false);
    const cropperRef = useRef<CropperRef>(null);
    const [image, setImage] = React.useState<string | null>(null);

    useEffect(() => {
        setOpen(isOpen ?? false);
    },[isOpen]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };
    
    const handleCrop = () => {
        const canvas = cropperRef.current?.getCanvas();
        if (!canvas) return;

        canvas.toBlob((blob) => {
        if (blob) {
            const file = new File([blob], 'cropped-image.png', { type: 'image/png' });

            const preview = URL.createObjectURL(file);

            const result: PreviewFile = {
                file,
                preview,
            };
            setImage(null);
            if(close) close(result);
        }
        }, 'image/png');
    };

    const handleClose = () => {
        setOpen(false);
        setImage(null);
        if(close) close(null);
    }

    return(
        <Dialog isOpen={open} sxProps={{ width: '500px', minHeight: '250px', borderRadius: '8px' }}>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    {
                        image && (
                            <Cropper
                                ref={cropperRef}
                                src={image}
                                stencilComponent={CircleStencil}
                                className="cropper"
                                stencilProps={{
                                    movable: true,
                                    resizable: true,
                                }}
                            />
                        )
                    }                    

                    <Button
                        fullWidth
                        component="label"
                        role={undefined}
                        variant="text"
                        tabIndex={-1}
                        sx={{ height: image ? undefined : '250px'}}
                    >
                        Seleccionar Imagen
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange}
                            multiple
                        />
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleCrop}
                        tabIndex={-1}
                    >Aceptar</Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={handleClose}
                        tabIndex={-1}
                        color="error"
                    >Cancelar</Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}