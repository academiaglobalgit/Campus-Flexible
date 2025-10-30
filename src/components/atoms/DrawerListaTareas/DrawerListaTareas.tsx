import * as React from 'react';
import { Drawer, useTheme, useMediaQuery, type SxProps, type Theme } from "@mui/material";

type AnchorType = 'left' | 'right' | 'top' | 'bottom';

type DsDrawerProps = {
    isOpen?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    anchor?: AnchorType;
    sxProps?: SxProps<Theme>;
};

export const DrawerListaTareas: React.FC<DsDrawerProps> = ({ children, isOpen = false, onClose, anchor = 'right', sxProps }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Drawer
            open={isOpen}
            onClose={onClose}
            anchor={anchor}
            slotProps={{
                paper: {
                    sx: {
                        maxWidth: isMobile ? 300 : 440,
                        backgroundColor: '#1A6FA7',
                        display: 'flex',
                        flexDirection: 'column',
                        ...sxProps,
                    },
                },
            }}
        >
            {children}
        </Drawer>

    );
};
