import { Box, CircularProgress, Typography, type SxProps, type Theme, Backdrop } from "@mui/material";
// import { Typography } from "../../atoms/Typography/Typography";

type LoadingCircularProps = {
    Text?: string;
    sxProps?: SxProps<Theme>;
    isSaving?: boolean;
}

export const LoadingCircular: React.FC<LoadingCircularProps> = ({ Text = "Cargando...", sxProps, isSaving = false }) => {
    return (
        <Backdrop open
            sx={(theme) => ({
                zIndex: theme.zIndex.drawer + 1,
                backgroundColor: isSaving ? "rgba(0, 0, 0, 0.3)" : "transparent",
            })}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    width: '100%',
                    height: '50vh',
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...sxProps
                }}
            >
                <CircularProgress sx={{ color: isSaving ? '#fff' : 'primary.main' }} />
                <Typography component="h4" variant="h4" color={isSaving ? "white" : "primary"} dangerouslySetInnerHTML={{ __html: Text }} sx={{ textAlign: 'center' }} />
            </Box>
        </Backdrop>
    )
}