import { Box, CircularProgress, Typography, type SxProps, type Theme } from "@mui/material";
// import { Typography } from "../../atoms/Typography/Typography";

type LoadingCircularProps = {
    Text?: string;
    sxProps?: SxProps<Theme>; 
}

export const LoadingCircular: React.FC<LoadingCircularProps> = ({ Text = "Cargando...", sxProps }) => {
    return(
        <Box 
            sx={
                { 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '20px', 
                    width: '100%', 
                    height: '50vh', 
                    overflow: 'hidden', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    ...sxProps 
                }
            }>
            <CircularProgress />
            <Typography component="h4" variant="h4" color="primary" dangerouslySetInnerHTML={{__html: Text}} sx={{textAlign: 'center'}} />
        </Box>
    )
}