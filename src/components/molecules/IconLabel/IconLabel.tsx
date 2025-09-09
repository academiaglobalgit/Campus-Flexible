// src/components/molecules/IconLabel/IconLabel.tsx
import DsSvgIcon from '../../atoms/Icon/Icon';
import { Typography } from '@mui/material';

type IconLabelProps = {
  icon: any;
  label: string;
  color?: string;
  action?: () => void;
  disabled?: number
};

export const IconLabel = ({
  icon,
  label,
  color = 'primary.main',
  action,
  disabled

}: IconLabelProps) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 4,
      cursor: disabled === 17 && label === 'Manual de Inducción' ? 'not-allowed' : 'pointer',
      pointerEvents: disabled === 17 && label === 'Manual de Inducción' ? 'none' : 'auto'
    }}
    onClick={() => action && action()}
  >
    <DsSvgIcon component={icon} color='primary' />
    <Typography color={color} component="p" variant="body1" sx={{ textAlign: 'center' }}>
      {label}
    </Typography>
  </div>
);