// src/components/molecules/IconLabel/IconLabel.tsx
import DsSvgIcon from '../../atoms/Icon/Icon';
import { Typography } from '@mui/material';

type IconLabelProps = {
  icon: any;
  label: string;
  color?: string;
  action?: () => void;
};

export const IconLabel = ({
  icon,
  label,
  color = 'primary.main',
  action,
}: IconLabelProps) => (
  <div 
    style={{ 
        display: 'flex', 
        alignItems: 'center', 
        flexDirection: 'column', 
        gap: 4,
        cursor: 'pointer',
    }}
    onClick={() => action && action()}
>
    <DsSvgIcon component={icon} color='primary' />
    <Typography color={color} component="p" variant="body2" sx={{textAlign:'center'}}>
      {label}
    </Typography>
  </div>
);