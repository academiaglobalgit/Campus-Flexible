import * as React from 'react';
import MuiDialog from '@mui/material/Dialog';
import type { SxProps, Theme } from '@mui/material';

type ResponsiveDialogProps = {
    isOpen?: boolean;
    children: React.ReactNode;
    sxProps?: SxProps<Theme>;
}

export const Dialog: React.FC<ResponsiveDialogProps> = ({children, isOpen, sxProps }) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (isOpen !== undefined) {
            setOpen(isOpen);
        }
    }, [isOpen]);
    
    return (
        <React.Fragment>
            <MuiDialog
                maxWidth="md"
                open={open}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: '#f0f0f0',
                            borderRadius: '20px', 
                            overflow: 'hidden',
                            ...sxProps,
                        },
                    },
                }}
            >
                { children }
            </MuiDialog>
        </React.Fragment>
    );
}
