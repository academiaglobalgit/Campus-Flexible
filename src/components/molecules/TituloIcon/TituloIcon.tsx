import { Box } from "@mui/material";
import DsSvgIcon from "../../atoms/Icon/Icon";
import { Typography } from "../../atoms/Typography/Typography";

type TituloIconProps = {
    Titulo?: string;
    Icon?: any;
    fontSize?: "h1" | "h2" | "h3" | "h4"
};

export const TituloIcon: React.FC<TituloIconProps> = ({Titulo, Icon, fontSize = "h4"}) => {
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2, mb: 2, }} >
                { Icon && <DsSvgIcon component={Icon} color="primary" /> }
                <Typography color="primary" component={fontSize} variant={fontSize}>
                    { Titulo }
                </Typography>
            </Box>
        </>
    );
};