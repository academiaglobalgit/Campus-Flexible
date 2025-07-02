import { Checkbox, FormControlLabel, type SxProps, type Theme } from "@mui/material";

type TypographyProps = {
    text?: string,
    place?: "end" | "bottom";
    sxProps?: SxProps<Theme>;
}

export const CheckBoxLabel: React.FC<TypographyProps> = ({
    text,
    place,
    sxProps
}) => {
    return (
        <FormControlLabel
            control={<Checkbox />}
            label={text}
            labelPlacement={place}
            sx={sxProps}
        />
    )
};