import type { SxProps, Theme } from "@mui/material";
import TypographyMui from "@mui/material/Typography";

type TypographyProps = {
    component: "span" | "h1" | "h2" | "h3" | "h4" | "p";
    variant: "body1" | "body2" | "h1" | "h2" | "h3" | "h4" | "subtitle1" | "subtitle2";
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | `text.primary`;
    children?: React.ReactNode;
    sxProps?: SxProps<Theme>;
}

export const Typography: React.FC<TypographyProps> = ({
    component,
    variant,
    color = 'text.primary',
    sxProps,
    children
}) => {
    return(
        <TypographyMui component={component} variant={variant} color={color} sx={sxProps} >
            { children }
        </TypographyMui>
    )
};