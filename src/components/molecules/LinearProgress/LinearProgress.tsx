import { Box, LinearProgress } from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";

type LinearProgressWithLabelProps = {
    value?: number;
    barColor?: string;
    trackColor?: string
};

export const LinearProgressWithLabel: React.FC<LinearProgressWithLabelProps> = ({ value, barColor, trackColor }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Barra */}
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                    variant="determinate"
                    value={value}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        // Track (fondo)
                        backgroundColor: trackColor,
                        // Barra
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: barColor,
                            borderRadius: 5,
                        },
                    }}
                />
            </Box>

            <Box sx={{ minWidth: 40 }}>
                <Typography variant="body1" color="text.primary" component={"p"}>{`${Math.round(value)}%`}</Typography>
            </Box>
        </Box>
    );
}