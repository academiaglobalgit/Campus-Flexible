
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { DialogContent } from "@mui/material";
import React, { useEffect } from "react";
import { LoadingCircular } from "../../LoadingCircular/LoadingCircular";

type LoadingDialogProps = {
    isOpen?: boolean;
    Text?: string;
    close?: () => void;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({ isOpen, Text }) => {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(isOpen ?? false);
    },[isOpen]);

    return(
        <Dialog isOpen={open} sxProps={{ width: '350px', borderRadius: '8px' }}>
            <DialogContent sx={{padding: '50px'}}>
                <LoadingCircular Text={Text || 'Loading...'} sxProps={{ height: undefined}} />
            </DialogContent>
      </Dialog>
    );
}

export default LoadingDialog;