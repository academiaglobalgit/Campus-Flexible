import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Collapse from '@mui/material/Collapse';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Badge, IconButton, styled, Typography, type CSSObject, type Theme } from '@mui/material';
import { MenuRoutes as MenuItems } from '@constants';

import Logo from '../../../assets/logo_ag.svg';
import miniLogo from '../../../assets/miniLogo.png';
import { Avatar } from '../../atoms/Avatar/Avatar';
import DsSvgIcon from '../../atoms/Icon/Icon';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import { PerfilMenu } from '../../molecules/Menu/PerfilMenu/PerfilMenu';
import { IconsTopBar } from '../../molecules/IconsTopBar/IconsTopBar';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(10)} + 2px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(11)} + 2px)`,
  },
  
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

const Listado = (title: string, open: boolean) => {
  const navigate = useNavigate();
  const menuRoutes = [...MenuItems].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

  const handleToggleSubmenu = (label: string) => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return(
    <>
      <Box sx={[
            { display: 'flex', width: '100%' }, 
            !open && { justifyContent: 'center' },
            open
              && { ml: 6 }
      ]}>
        <Typography variant='body1' color='primary' sx={[{ fontWeight: 700 }, open && {fontSize: '18px'}]}>{title}</Typography>
      </Box>
    
      <List sx={{ width: '100%' }}>
        {
          menuRoutes.filter((item) => item.visible === 1).map((item) => {
            const hasChildren = item.children.length > 0;
            const isOpen = openSubmenu === item.text;

            return (
              <React.Fragment key={item.text}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    onClick={() => hasChildren ? handleToggleSubmenu(item.text) : handleNavigation(item.path)}
                    sx={[
                      {
                        minHeight: 48,
                        px: 3.5,
                      },
                      open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
                    ]}
                  >
                    <ListItemIcon
                      sx={[
                        { minWidth: 0, justifyContent: 'center' },
                        open ? { mr: 3 } : { mr: 'auto' },
                      ]}
                    >
                      <DsSvgIcon color="primary" component={item.icon} sxProps={{ color: (theme: any) => theme.palette.primary[300]}} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                    {hasChildren && open && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                </ListItem>

                {hasChildren && (
                  <Collapse in={isOpen && open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((child) => (
                        <ListItemButton
                          key={child.text}
                          sx={{
                            pl: open ? 9 : 4,
                            justifyContent: open ? 'initial' : 'center',
                          }}
                        >
                          <ListItemText
                            primary={child.text}
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            );
          })
        }
      </List>
    </>
  );
};

const Sidenav = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <Drawer 
        variant="permanent" 
        open={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        sx={{
          boxShadow: "0px 2px 4px 0px #6BBBE44D",
        }}
      >
        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', flexGrow: 2}}>
            <Box
                  component="img"
                  src={open ? Logo : miniLogo}
                  alt="AG College Logo"
                  sx={{
                      mt: 4,
                      mb: '29px',
                  }}
            />
            {Listado("Menú", open)}
            <Divider sx={{ width: open ? '90%' : '50%'}} />
            {/* {Listado("Más", open)} */}
        </Box>
               
        <Box sx={[{height: '70px', display: 'flex', alignItems:'center', gap: '10px', justifyContent: !open ? 'center' : 'flex-start'}, open && {paddingLeft: '20px'}]}>
              <IconButton sx={{ p: 0 }}>
                <Avatar width={48} height={48} onClick={(event) => handleMenu(event)} />
              </IconButton>
              {
                open && 
                <Badge onClick={(event) => handleMenu(event)} sx={{cursor: 'pointer'}}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  badgeContent={
                    <ArrowCircleUpOutlinedIcon color='primary' sx={{ transform: 'rotate(40deg)'}} />
                  }
                >
                  <Box>
                    <Typography variant="body1" component="div">
                      Nombre
                    </Typography>
                    <Typography variant="body1" component="div">
                      Aguascalientes, Mexico
                    </Typography>
                  </Box>
                </Badge>                
              }
              <PerfilMenu anchorEl={anchorEl} onClose={handleMenuClose} />
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3,  overflowX: 'hidden' }}
      >
        <AppBar color='inherit' sx={{ boxShadow: "0px 4px 8px 0px #6BBBE466" }}>
          <Toolbar sx={{display: 'flex', justifyContent: 'flex-end', gap: '20px'}}>
            <Typography variant="h4" component="h4" color='primary'>
              Nombre de la plataforma
            </Typography>
            <IconsTopBar />
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Box sx={[
            {p: 2},
            open && { marginLeft: `-${drawerWidth}px`}
          ]}>
          <Outlet/>
        </Box>
      </Box>
    </Box>
  );
}
export default Sidenav;