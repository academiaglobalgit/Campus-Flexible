import { Box, Grid, useMediaQuery, useTheme, Typography } from "@mui/material"
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";

type ContainerDesktopProps = {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    children?: React.ReactNode;
    column1Size?: number;
    column2Size?: number;
    specialButton?: React.ReactNode;
}

export const ContainerDesktop: React.FC<ContainerDesktopProps> = (
    {
        title,
        description,
        specialButton,
        actions,
        children,
        column1Size = 8,
        column2Size = 4,
    }) => {
    const theme = useTheme();
    const betweenDevice = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    return (
        <Box sx={{ width: { md: '100%' }, display: 'flex', flexDirection: 'column', gap: description ? '20px' : '0px', pb: '100px' }}>
            <Grid container sx={{ alignItems: 'center' }}>
                <Grid size={{ md: !betweenDevice ? (actions === undefined ? 10 : column1Size) : 12 }}>
                    <TituloIcon Titulo={title} fontSize="h2" />
                    {
                        description && (<Typography component="span" variant="body1" dangerouslySetInnerHTML={{ __html: description }} >
                        </Typography>)
                    }
                    {
                        specialButton && (
                            <Box sx={{ width: !betweenDevice ? '345px' : '100%', paddingTop: '20px', paddingBottom: '20px' }}>
                                {specialButton}
                            </Box>
                        )
                    }
                </Grid>
                {
                    actions && (
                        <Grid size={{ md: !betweenDevice ? column2Size : 12 }} sx={{ width: betweenDevice ? "100%" : undefined }}>
                            {actions}
                        </Grid>
                    )
                }
            </Grid>
            <Box>
                {children}
            </Box>
        </Box>
    )
}