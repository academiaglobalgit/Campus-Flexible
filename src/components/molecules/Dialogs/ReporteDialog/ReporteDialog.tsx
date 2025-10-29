import React, { useEffect } from "react";
import { DialogContent, Box, DialogTitle, DialogActions } from "@mui/material";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import Button from "../../../atoms/Button/Button";
import { Typography } from "../../../atoms/Typography/Typography";

type DialogProps = {
    isOpen?: boolean;
    tittle?: string;
    data?: any;
    close: () => void;
};

export const ReporteDialog: React.FC<DialogProps> = ({ isOpen, close, data, tittle }) => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
        close();
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
            </DialogActions>
        </Dialog>
    );
};
