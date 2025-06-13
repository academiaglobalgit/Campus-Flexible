import ButtonMUI from '@mui/material/Button';
import type { SxProps, Theme } from '@mui/material/styles';

type dsButtonProps = {
    color?: 'primary' | 'success' | 'error' | 'info' | 'warning';
    disabled?: boolean;
    fullWidth?: boolean;
    variant?: 'text' | 'outlined' | 'contained';
    size?: 'small' | 'medium' | 'large';
    onClick: () => void;
    children: React.ReactNode;
    sxProps?: SxProps<Theme>;
    isLoading?: boolean;
};

const Button = ({ color = 'primary', variant = 'contained', size = 'medium', children, disabled, onClick, sxProps, fullWidth, isLoading }: dsButtonProps) => {
    return (
        <ButtonMUI 
            fullWidth={fullWidth}
            disabled={disabled}
            color={color}
            variant={variant} 
            size={size}
            onClick={onClick}
            sx={sxProps}
            loading={isLoading}
            loadingPosition="end"
        >{children}</ButtonMUI>
    );
}

export default Button;