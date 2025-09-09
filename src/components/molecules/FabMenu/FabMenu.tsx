import React from 'react';
import { Fab } from '@mui/material';
import { MobileMenu } from '../Menu/MobileMenu/MobileMenu';
import DsSvgIcon from '../../atoms/Icon/Icon';
import { PlusCircleWhite, ArrowUp } from '../../../assets/icons';

export const FabMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [changeIcon, setChangeIcon] = React.useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Fab
        variant="extended"
        color="primary"
        onClick={handleClick}
        onMouseEnter={() => {
            setChangeIcon(true)
        }}
        onMouseLeave={() => {
            setChangeIcon(false)
        }}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: (theme) => theme.zIndex.tooltip + 1,
          textTransform: 'none'
        }}
      >
        <DsSvgIcon component={!changeIcon ? PlusCircleWhite : ArrowUp} color='white' sxProps={{ mr: 1, width: '16px', height: '16px' }}/>
        Más Información
      </Fab>
      <MobileMenu anchorEl={anchorEl} onClose={handleClose} menuType={"menuInformacion"} />
    </>
  );
}
