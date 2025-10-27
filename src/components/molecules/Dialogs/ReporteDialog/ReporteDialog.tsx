import React from "react";
import { Dialog, DialogContent, Box, DialogTitle, DialogActions } from "@mui/material";
import Button from "../../../atoms/Button/Button";
import { Typography } from "../../../atoms/Typography/Typography";

type DialogProps = {
    isOpen?: boolean;
    tittle?: string;
    data?: any;
    close: (isConfirmar: boolean) => void;
};

export const ReporteDialog: React.FC<DialogProps> = ({ isOpen = false, close, data, tittle }) => {
    const handleClose = () => close(false);

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            sx={{
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
            </DialogActions>
        </Dialog>
    );
};
