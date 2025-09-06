import React, { useEffect } from "react";
import { Box, DialogContent } from "@mui/material";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { Avatar } from "../../../atoms/Avatar/Avatar";
import { Typography } from "../../../atoms/Typography/Typography";
import check_circle from "../../../../assets/check_circle.png";
import { useMutation } from "@tanstack/react-query";
import { useCreateConfirmar } from "../../../../services/PlanEstudioService";
import { useNotification } from "../../../../providers/NotificationProvider";

import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

type DialogProps = {
    idCurso: number;
    isOpen?: boolean;
    close: (isConfirmar: boolean) => void;
}

export const InscribirmeDialog: React.FC<DialogProps> = ({idCurso, isOpen, close}) => {
    const { showNotification } = useNotification();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    useEffect(() => {
        setOpen(isOpen ?? false);
    },[isOpen]);

    const handleClose = () => {
        setOpen(false);
        close(false);
        setHasError(false);
        setErrorMessage("");
    };

    const handleConfirmar = () => {
        setLoading(true);
        createMutation.mutate(idCurso);
    }

    const createMutation = useMutation({
        mutationFn: useCreateConfirmar,
        onSuccess: () => {
            showNotification(`Se inscribio satisfactorimente al curso`,"success");
            setLoading(false);
            setOpen(false);
            close(true);
        },
        onError: (error : any) => {
            setErrorMessage(error?.response?.data?.message ?? "Ocurrió un error inesperado");
            setLoading(false);
            setHasError(true);
        },
        onSettled: () => {
            console.log('La mutación ha finalizado');
        }
    });
    
    return(
        <Dialog isOpen={open} sxProps={{ margin: '5px', width: '350px', height: '342px'}} >
            <DialogContent>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px', flexDirection: 'column'}}>
                    {
                        !hasError
                        ?
                            <>
                                <Avatar src={check_circle} width={150} height={150} />
                                <Typography component="h3" variant="h3" color="primary">¿Deseas Inscribirte?</Typography>
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%'}}>
                                    <>
                                        <Button onClick={handleConfirmar} fullWidth isLoading={loading}>
                                            Confirmar
                                        </Button>
                                    </>
                                    <>
                                        <Button onClick={handleClose} fullWidth variant="outlined" color="primary" disabled={loading}>
                                            Cancelar
                                        </Button>
                                    </>
                                </Box>
                            </>
                        :
                            <>
                                <WarningAmberOutlinedIcon sx={{ fontSize: '96px', color: '#D9A514' }} />
                                <Typography component="h5" variant="h5" color="primary" sxProps={{textAlign: 'center'}}>{errorMessage}</Typography>
                                <Box sx={{width: '100%'}}>
                                    <Button onClick={handleClose} fullWidth>
                                        Aceptar
                                    </Button>
                                </Box>
                            </>
                    }
                    
                </Box>
            </DialogContent>
        </Dialog>
    );
}