import React, { useEffect } from "react";
import { Box, DialogContent } from "@mui/material";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { Avatar } from "../../../atoms/Avatar/Avatar";
import { Typography } from "../../../atoms/Typography/Typography";
import check_circle from "../../../../assets/check_circle.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCreateConfirmar } from "../../../../services/PlanEstudioService";
import { PLAN_ESTUDIO_ENDPOINTS } from "../../../../types/endpoints";
import { useNotification } from "../../../../providers/NotificationProvider";

type DialogProps = {
    idCurso: number;
    isOpen?: boolean;
    close: (isConfirmar: boolean) => void;
}

export const InscribirmeDialog: React.FC<DialogProps> = ({idCurso, isOpen, close}) => {
    const queryClient = useQueryClient();
    const { showNotification } = useNotification();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        setOpen(isOpen ?? false);
    },[isOpen]);

    const handleClose = () => {
        setOpen(false);
        close(false); 
    };

    const handleConfirmar = () => {
        setLoading(true);
        createMutation.mutate(idCurso);
    }

    const createMutation = useMutation({
        mutationFn: useCreateConfirmar,
        onSuccess: async () => {
            
            await queryClient.invalidateQueries({
                queryKey: [PLAN_ESTUDIO_ENDPOINTS.GET_MATERIAS.key],
            });
            
            showNotification(`Se inscribio satisfactorimente al curso`,"success");
            setLoading(false);
            setOpen(false);
            close(true);
        },
        onError: (error) => {
            showNotification(`Error al registrar: ${error.message}`, "error");
            setLoading(false);
        },
        onSettled: () => {
            console.log('La mutación ha finalizado');
        }
    });
    
    return(
        <Dialog isOpen={open} sxProps={{ margin: '5px', width: '350px', height: '342px'}} >
            <DialogContent>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px', flexDirection: 'column'}}>
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
                </Box>
            </DialogContent>
        </Dialog>
    );
}