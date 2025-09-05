import { Checkbox, FormControlLabel, type SxProps, type Theme } from "@mui/material";

type TypographyProps = {
    text?: string,
    place?: "end" | "bottom" | "start";
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: () => void;
    disabled ?: boolean;
    sxProps?: SxProps<Theme>;
}

export const CheckBoxLabel: React.FC<TypographyProps> = ({
    text,
    place,
    defaultChecked,
    checked, 
    onChange,
    disabled ,
    sxProps
}) => {
    return (
        <FormControlLabel
            control={<Checkbox 
                defaultChecked={defaultChecked}
                checked={!!checked}
                onChange={onChange}
            />}
            disabled={disabled}
            label={text}
            labelPlacement={place}
            sx={sxProps}
        />
    )
};