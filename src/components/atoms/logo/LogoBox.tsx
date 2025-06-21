import { Box } from "@mui/material";

type BoxProps = {
    src: string;
    alt?: string;
    sx?: object;
}

export const LogoBox: React.FC<BoxProps> = ({ src, alt, sx}) => {
    return (
        <Box
            component="img"
            src={src}
            alt= {alt}
            sx={sx}
        />
    );
};
