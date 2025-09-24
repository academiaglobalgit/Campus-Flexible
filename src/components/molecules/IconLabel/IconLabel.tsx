import DsSvgIcon from '../../atoms/Icon/Icon';
import { Typography } from '@mui/material';

type IconLabelProps = {
  icon: any;
  label: string;
  color?: string;
  isDisabled: boolean;
  action?: () => void;
};

export const IconLabel = ({ icon, label, color = 'primary.main', isDisabled, action }: IconLabelProps) => {

  const handleAction = () => {
    if(!isDisabled && action) {
      action();
    }
  }

  return(
    <div 
      style={{ 
          display: 'flex', 
          alignItems: 'center', 
          flexDirection: 'column', 
          gap: 4,
          cursor: !isDisabled ? 'pointer' : 'not-allowed',          
      }}
      onClick={handleAction}
    >
      <DsSvgIcon component={icon} color={!isDisabled ? 'primary' : 'disabled' } />
      <Typography color={ !isDisabled ? color : 'textDisabled' } component="p" variant="body1" sx={{textAlign:'center'}}>
        {label}
      </Typography>
    </div>
  );
}