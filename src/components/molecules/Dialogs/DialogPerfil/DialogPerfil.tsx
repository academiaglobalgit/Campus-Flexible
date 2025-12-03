import React, { useEffect, useState } from "react";
import { Box, DialogActions, DialogContent, useMediaQuery, useTheme } from "@mui/material";

import { Dialog } from "../../../atoms/Dialog/Dialog";
import Button from "../../../atoms/Button/Button";
import MiPerfil from "../../../pages/MiPerfil/MiPerfil";
import type { PerfilResponse } from "@constants";
import { Typography } from "../../../atoms/Typography/Typography";

type DialogPerfilProps = {
  isOpen?: boolean;
  close?: () => void;
  canClose?: boolean;
  onProfileUpdated?: (perfil?: PerfilResponse) => void;
};

export const DialogPerfil: React.FC<DialogPerfilProps> = ({ isOpen, close, canClose = true, onProfileUpdated }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen ?? false);
  }, [isOpen]);

  const handleClose = () => {
    if (!canClose) return;
    setOpen(false);
    if (close) close();
  };

  if (!open) return null;

  return (
    <Dialog
      isOpen={open}
      sxProps={{
        width: isMobile ? "100%" : "90vw",
        maxWidth: "1200px",
        maxHeight: "90vh",
      }}
    >
      <DialogContent
        sx={{
          backgroundColor: "#fff",
          padding: isMobile ? "10px" : "24px",
        }}
      >
        <Box sx={{ maxHeight: "70vh", overflowY: "auto" }}>
          <Typography component="h3" variant="h3" sxProps={{ mb: 1}}>
            Importante: Actualiza tus datos de contacto
          </Typography>
          <Typography component="p" variant="body3" sxProps={{ textAlign: 'justify' }}>
            Estimado estudiante. <br />
            Esperando que te encuentres bien, agradeceríamos nos apoyaras con la actualización de tus datos de contacto. <br />
            Mantener esta información al día es esencial para un seguimiento académico óptimo y la recepción de avisos importantes. <br />
            Agradecemos de antemano tu valiosa colaboración.
          </Typography>
          <MiPerfil variant="dialog" onProfileUpdated={onProfileUpdated} />
        </Box>
      </DialogContent>
      {canClose && (
        <DialogActions sx={{ padding: isMobile ? "10px" : "24px" }}>
          <Button fullWidth={isMobile} onClick={handleClose}>
            Cerrar
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default DialogPerfil;
