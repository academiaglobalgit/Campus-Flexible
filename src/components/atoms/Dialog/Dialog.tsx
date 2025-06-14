import * as React from 'react';
import MuiDialog from '@mui/material/Dialog';

type ResponsiveDialogProps = {
    isOpen?: boolean;
    children: React.ReactNode;
    width?: string;
}

export const Dialog: React.FC<ResponsiveDialogProps> = ({children, isOpen, width='350px' }) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (isOpen !== undefined) {
            setOpen(isOpen);
        }
    }, [isOpen]);
    
    return (
        <React.Fragment>
            <MuiDialog
                open={open}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: '#f0f0f0',
                            borderRadius: '20px', 
                            overflow: 'hidden',
                            width
                        },
                    },
                }}
            >
                { children }
            </MuiDialog>
        </React.Fragment>
    );
}
