import { Box } from "@mui/material";
import DsSvgIcon from "../../atoms/Icon/Icon";
import { Typography } from "../../atoms/Typography/Typography";

type TituloIconProps = {
    Titulo: string;
    Icon?: any;
};

export const TituloIcon: React.FC<TituloIconProps> = ({Titulo, Icon}) => {
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2, mb: 2, }} >
                { Icon && <DsSvgIcon component={Icon} color="primary" /> }
                <Typography color="primary" component="h4" variant="h4">
                    { Titulo }
                </Typography>
            </Box>
        </>
    );
};