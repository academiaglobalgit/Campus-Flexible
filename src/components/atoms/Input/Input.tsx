import { TextField, type TextFieldVariants } from "@mui/material";

type InputTextProps = {
    id: string;
    fullWidth?: boolean;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    variant?: TextFieldVariants;
    size?: 'small' | 'medium';
}

export const InputText: React.FC<InputTextProps> = ({ id, label, value, onChange, placeholder, variant = 'outlined', fullWidth=true, size }) => {
    
    const textFieldVariant: TextFieldVariants = variant !== undefined ? variant : 'outlined';

    return (
        <TextField 
            id={id} 
            label={label}
            fullWidth={fullWidth}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoComplete="new-password"
            variant={textFieldVariant}
            size={size}
        />
    );
};