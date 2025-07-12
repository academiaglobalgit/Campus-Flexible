import { Checkbox, FormControlLabel, type SxProps, type Theme } from "@mui/material";

type TypographyProps = {
    text?: string,
    place?: "end" | "bottom" | "start";
    defaultChecked?: boolean;
    disabled ?: boolean;
    sxProps?: SxProps<Theme>;
}

export const CheckBoxLabel: React.FC<TypographyProps> = ({
    text,
    place,
    defaultChecked,
    disabled ,
    sxProps
}) => {
    return (
        <FormControlLabel
            control={<Checkbox defaultChecked={defaultChecked}
            />}
            disabled={disabled}
            label={text}
            labelPlacement={place}
            sx={sxProps}
        />
    )
};