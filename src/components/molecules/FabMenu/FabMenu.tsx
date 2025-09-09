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

  React.useEffect(() => {
    // Crear el elemento script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://agent.d-id.com/v2/index.js';
    script.setAttribute('data-mode', 'fabio');
    script.setAttribute('data-client-key', 'Z29vZ2xlLW9hdXRoMnwxMTgyODc4NjM3MDQwODcyOTIzNTI6dXlUbGxjbDJuWlhWY003OUh3cDA0');
    script.setAttribute('data-agent-id', 'v2_agt_4Yofx9b_');
    script.setAttribute('data-name', 'did-agent');
    script.setAttribute('data-monitor', 'true');
    script.setAttribute('data-orientation', 'horizontal');
    script.setAttribute('data-position', 'right');

    document.head.appendChild(script);

    // Cleanup
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

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
