import { Box } from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";
import { flexRows } from "@styles";

type CardDuracionProps = {
    label: string;
    description: string;
    sxProps?: any;
}

export const CardDuracion: React.FC<CardDuracionProps> = ({ label, description, sxProps }) => {
    return (
        <Box sx={{
                ...flexRows,
                ...sxProps,
                backgroundColor: "#F8F8F9", 
                gap: "10px",
                boxShadow: "0px 2px 4px 0px #6BBBE44D", 
                border: "1px solid #BABABA0D",
                height: "57px",
                borderRadius: "3px",
        }}>
            <Typography component="span" variant="body3">{label}</Typography>
            <Typography component="span" variant="h4" color="primary">{description}</Typography>
        </Box>
    )
};