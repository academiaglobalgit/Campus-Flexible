import { Typography } from "@mui/material";

type BoxProps = {
    sxTypo: object;
    text: string
}

export const Footer: React.FC<BoxProps> = ({ sxTypo, text }) => {
    return (
        <Typography 
            variant="body1" 
            sx={sxTypo} 
            component="footer" 
            dangerouslySetInnerHTML={{ __html: text }} 
        />
    );
};
