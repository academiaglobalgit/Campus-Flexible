import React, { useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { DialogContent, Box, DialogTitle, DialogActions } from "@mui/material";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import Button from "../../../atoms/Button/Button";
import { Typography } from "../../../atoms/Typography/Typography";
import { useGetReportePruebas } from "../../../../services/CalificacionesService";

type DialogProps = {
    isOpen?: boolean;
    tittle?: string;
    data?: any;
    close: () => void;
};

type PdfResponse = {
    success: boolean;
    pdf?: {
        url: string;
        info: string;
    };
};


export const ReporteDialog: React.FC<DialogProps> = ({ isOpen, close, data, tittle }) => {
    console.log("🚀 ~ ReporteDialog ~ data:", data)
    const [open, setOpen] = React.useState(false);
    const { refetch } = useGetPdf();

    const handleClose = () => {
        setOpen(false);
        close();
    };

    const useGetPdf = () => {
        return useQuery<PdfResponse, Error>({
            queryKey: ['pdf'],
            queryFn: async () => {
                const res = await fetch('/generate/pdf'); // ejemplo
                return res.json() as Promise<PdfResponse>;
            },
            enabled: false,
        });
    };


    const handleDescargar = async () => {
        const { data } = await refetch(); // data: PdfResponse | undefined

        if (data?.success && data.pdf?.url) {
            window.open(data.pdf.url, '_blank');
        } else {
            console.error('No se pudo obtener el PDF');
        }
    };


    useEffect(() => {
        setOpen(isOpen ?? false);
    }, [isOpen]);

    return (
        <Dialog
            isOpen={open}
            sxProps={{
                "& .MuiDialog-paper": {
                    margin: "5px",
                    width: "100%",
                    borderRadius: "16px",
                    padding: "20px",
                },
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }}>
                <Typography component="h3" variant="h3" color="primary">
                    {tittle}
                </Typography>
            </DialogTitle>

            <DialogContent dividers>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "20px",
                        flexDirection: "column",
                        textAlign: "center",
                        width: "100%",
                    }}
                >
                    <Box dangerouslySetInnerHTML={{ __html: data }} />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} variant="contained" fullWidth>
                    Aceptar
                </Button>
                <Button onClick={handleDescargar} variant="contained" fullWidth>
                    Descargar Reporte
                </Button>
            </DialogActions>
        </Dialog>
    );
};
