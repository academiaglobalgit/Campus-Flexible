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
import { Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Badge, IconButton, styled, Typography, useMediaQuery, useTheme, type CSSObject, type Theme } from '@mui/material';
import { AppRoutingPaths, MenuRoutes as MenuItems, TitleScreen } from '@constants';

import { Avatar } from '../../atoms/Avatar/Avatar';
import DsSvgIcon from '../../atoms/Icon/Icon';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import { IconsTopBar } from '../../molecules/IconsTopBar/IconsTopBar';
//import { FabMenu } from '../../molecules/FabMenu/FabMenu';
import { LeftCircle } from '../../../assets/icons';
import { ShowBackMenuRoutes } from '../../../utils/Helpers';
import { useAuth } from '../../../hooks';
import { loadConfig } from '../../../config/configStorage';
import { useGetCursos } from '../../../services/CursosActivosService';
import { usePlanEstudio } from '../../../context/PlanEstudioContext';


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

const Sidenav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { config: configPlanEstudio } = usePlanEstudio();
  
  const showBackMenuRoutes = ShowBackMenuRoutes;
  const is1366 = useMediaQuery('(width: 1366px)');

  const { data: cursosData } = useGetCursos();

  const showBackMenu = showBackMenuRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  const [open, setOpen] = React.useState(false);
  const [config, setConfig] = React.useState<any>(null);

  React.useEffect(() => {
    loadConfig().then(cfg => {
      setConfig(cfg);
    });
  }, []);

  const handleMiPerfil = () => {
    navigate(AppRoutingPaths.MI_PERFIL);
  };

  const handleNavigate = () => {
    window.history.back();
  };

  const AppBarSection = () => {
    return (
      <AppBar color='inherit' sx={{ boxShadow: "0px 4px 8px 0px #6BBBE466" }}>

        <Box sx={
          [
            showBackMenu && { display: 'flex', justifyContent: 'space-between' }
          ]
        }>

          {showBackMenu && (
            <Toolbar onClick={handleNavigate}>
              <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: '100px', }}>
                <IconButton >
                  <DsSvgIcon component={LeftCircle} color='primary' />
                </IconButton>
                <Typography component="h4" variant="h4" sx={{ ml: '2px' }}>
                  Regresar
                </Typography>
              </Box>
            </Toolbar>
          )}

          <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
            <Typography variant="h4" component="h4" color='primary'>
              {user?.nombrePrograma}
            </Typography>
            <IconsTopBar />
          </Toolbar>
        </Box>
      </AppBar>
    )
  };

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const Listado = (
    title: string,
    open: boolean,
    menuType: "main" | "more",
    selectedIndex: number,
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

    let menuRoutes = [...MenuItems]
      .filter((item) => item.menu === menuType)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    menuRoutes = configPlanEstudio?.getFilteredMenuRoutes(menuRoutes) || menuRoutes;

    const handleToggleSubmenu = (label: string) => {
      setOpenSubmenu((prev) => (prev === label ? null : label));
    };

    const handleNavigation = (path: string, index: number) => {
      navigate(path);
      setSelectedIndex(index);
    };

    const getCounter = (item: typeof menuRoutes[number]) => {
      if (item.text === TitleScreen.CURSOS_ACTIVOS) {
        return cursosData?.data.length || 0;
      }
    };

    return (
      <>
        <Box
          sx={[
            { display: 'flex', width: '100%' },
            !open && { justifyContent: 'center' },
            open && { ml: 6 },
          ]}
        >
          <Typography
            variant="body1"
            color="primary"
            sx={[
              menuType === 'more' && { color: theme.palette.grey[600] },
              { fontWeight: 700 },
              open && { fontSize: '18px' },
            ]}
          >
            {title}
          </Typography>
        </Box>

        <List sx={{ width: '100%' }}>
          {menuRoutes
            .filter((item) => item.visible === 1)
            .map((item, index) => {
              const hasChildren = item.children.length > 0;
              const isOpen = openSubmenu === item.text;
              const absoluteIndex = (menuType === 'more' ? 1000 : 0) + index;

              return (
                <React.Fragment key={item.text}>
                  <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      selected={selectedIndex === absoluteIndex}
                      onClick={() =>
                        hasChildren
                          ? handleToggleSubmenu(item.text)
                          : handleNavigation(item.path, absoluteIndex)
                      }
                      sx={[
                        {
                          minHeight: 48,
                          px: 3.5,
                          '&.Mui-selected': {
                            bgcolor: theme.palette.action.selected,
                            color: theme.palette.primary.main,
                          },
                          '&.Mui-selected:hover': {
                            bgcolor: theme.palette.action.hover,
                          },
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
                        <DsSvgIcon
                          color="primary"
                          component={item.icon}
                          sxProps={{
                            color: config?.data?.color_primary || theme.palette.primary.main,
                          }}
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary={item.text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />

                      {item.hasCount &&
                        open &&
                        getCounter(item) !== 0 && (
                          <Box
                            component="span"
                            sx={{
                              color: '#FFFFFF',
                              bgcolor: 'primary.main',
                              width: 24,
                              height: 20,
                              fontSize: 12,
                              fontWeight: 400,
                              lineHeight: '24px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '6px',
                            }}
                          >
                            {getCounter(item)}
                          </Box>
                        )}

                      {hasChildren && open && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                    </ListItemButton>
                  </ListItem>

                  {hasChildren && (
                    <Collapse in={isOpen && open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.children.map((child, i) => {
                          const childIndex = absoluteIndex * 100 + i;
                          return (
                            <ListItemButton
                              key={child.text}
                              selected={selectedIndex === childIndex}
                              onClick={() =>
                                handleNavigation(child.path, childIndex)
                              }
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
                          );
                        })}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              );
            })}
        </List>
      </>
    );
  };

  return (
    <Box>
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
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', flexGrow: 2 }}>
          <Box
            component="img"
            src={open ? config?.data.logo_url : config?.data.logo_url_mini}
            alt="AG College Logo"
            sx={{
              mt: 4,
              mb: '29px',
              maxWidth: open ? '200px' : 'auto',
            }}
          />
          {Listado("Menú", open, "main", selectedIndex, setSelectedIndex)}
          <Divider sx={{ width: open ? '90%' : '50%' }} />
          {Listado("Más", open, "more", selectedIndex, setSelectedIndex)}
        </Box>

        <Box sx={[{ height: '70px', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: !open ? 'center' : 'flex-start' }, open && { paddingLeft: '20px' }]}>
          <IconButton sx={{ p: 0 }}>
            <Avatar width={48} height={48} onClick={handleMiPerfil} alt={user?.name} src={user?.photo} />
          </IconButton>
          {
            open &&
            <Badge onClick={handleMiPerfil} sx={{ cursor: 'pointer' }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              badgeContent={
                <ArrowCircleUpOutlinedIcon color='primary' sx={{ transform: 'rotate(40deg)', ml: 5 }} />
              }
            >
              <Box>
                <Typography variant="body1" component="div">
                  {user?.name}
                </Typography>
                <Typography variant="body1" component="div" color='disabled'>
                  {user?.city}
                </Typography>
              </Box>
            </Badge>
          }
        </Box>
      </Drawer>
      <Box sx={[
        { paddingTop: '90px' },
        is1366 && { display: 'flex', justifyContent: 'center' }
      ]
    }>
        <AppBarSection />
        <Outlet />
        <ScrollRestoration />
        {/* <FabMenu /> */}
      </Box>
    </Box>
  );
}

export default Sidenav;