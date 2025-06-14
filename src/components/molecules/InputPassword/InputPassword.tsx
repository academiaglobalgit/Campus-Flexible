import { useState } from 'react';
import { TextField, InputAdornment, IconButton, type TextFieldVariants } from '@mui/material';

import DsSvgIcon from '../../atoms/Icon/Icon';
import { Eye, Hide } from '../../../assets/icons';

type InputPasswordProps = {
    id: string;
    fullWidth?: boolean;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    variant?: TextFieldVariants;
    size?: 'small' | 'medium';
}

export const InputPassword: React.FC<InputPasswordProps> = ({ 
    id, 
    label, 
    value, 
    onChange, 
    placeholder, 
    variant = 'outlined', 
    fullWidth = true, 
    size 
}) => {
    const [showPassword, setShowPassword] = useState(false);
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <TextField
            id={id}
            label={label}
            fullWidth={fullWidth}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoComplete="new-password"
            variant={variant}
            size={size}
            type={showPassword ? 'text' : 'password'}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                <DsSvgIcon 
                                    component={showPassword ? Hide : Eye}
                                    color="inherit"
                                />    
                            </IconButton>
                        </InputAdornment>
                    ),
                }
            }}
        />
    );
};