import type { TextFieldVariants } from "@mui/material/TextField";

export interface InputTextProps {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    variant?: TextFieldVariants;
}