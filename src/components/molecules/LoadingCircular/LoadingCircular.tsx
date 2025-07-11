import { Box, CircularProgress } from "@mui/material"
import { Typography } from "../../atoms/Typography/Typography"

type LoadingCircularProps = {
    Text?: string
}

export const LoadingCircular: React.FC<LoadingCircularProps> = ({ Text = "Cargando..." }) => {
    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', height: '50vh', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
            <Typography component="h4" variant="h4" color="primary">
                {Text}
            </Typography>
        </Box>
    )
}