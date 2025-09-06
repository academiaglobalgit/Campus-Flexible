import { Alert, Snackbar, type AlertColor } from "@mui/material";
import { createContext, useContext, useState, type ReactNode } from "react";

type NotificationContextType = {
    showNotification: (message: string, severity?: AlertColor) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({children}) => { 
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>("info");

    const showNotification = (msg: string, level: AlertColor = "info") => {
        setMessage(msg);
        setSeverity(level);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const value = {
        showNotification
    };

    return(
        <NotificationContext.Provider value={value}>
            {children}
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: "100%"}}>
                    {message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    )
};

export const useNotification = () => { 
    const context = useContext(NotificationContext);
    if(!context) throw new Error("useNotification debe ser usado dentro NotificationProvider");
    return context;
};