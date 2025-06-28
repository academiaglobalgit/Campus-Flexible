import { Box, Grid, useMediaQuery, useTheme } from "@mui/material"
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Typography } from "../../atoms/Typography/Typography";

type ContainerDesktopProps = {
    title: string;
    description: string;
    children: React.ReactNode;
}

export const ContainerDesktop: React.FC<ContainerDesktopProps> = ({ title, description, children }) => {
    const theme = useTheme();
    const betweenDevice = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    
    return(
        <Box sx={{ width: { md: '90vw' }, display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <Grid container sx={{ alignItems:'center'}}>
                <Grid size={{md: !betweenDevice ? 8 : 12}}>
                    <TituloIcon Titulo={title} fontSize="h2" />
                    <Typography component="span" variant="body1">
                        { description }
                    </Typography>
                </Grid>
            </Grid>
            <Box>
                { children }
            </Box>
        </Box>
    )
}