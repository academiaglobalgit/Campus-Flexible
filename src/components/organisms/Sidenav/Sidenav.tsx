import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Collapse from '@mui/material/Collapse';

import {
  Dashboard as DashboardIcon,
  ShoppingCart as OrdersIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { AppRoutingPaths } from '@constants';

const drawerWidth = 240;

interface NavigationItem {
  text: string;
  icon: React.ReactElement;
  path?: string;
  children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
  {
    text: 'Main items',
    icon: <></>,
    children: [
      { text: 'Home', icon: <DashboardIcon />, path: AppRoutingPaths.HOME },
      { text: 'Calificaciones', icon: <OrdersIcon />, path: AppRoutingPaths.CALIFICACIONES },
      { text: 'Mi Ruta', icon: <OrdersIcon />, path: AppRoutingPaths.MIRUTA },
      // { text: 'ToDo', icon: <OrdersIcon />, path: AppRoutingPaths.TODO },
    ],
  },
  // {
  //   text: 'Analytics',
  //   icon: <></>,
  //   children: [
  //     { text: 'Reports', icon: <ReportsIcon />, path: AppRoutingPaths.HOME },
  //     { text: 'Integrations', icon: <ReportsIcon />, path: AppRoutingPaths.HOME },
  //   ],
  // },
];

type SidenavProps = {
    isOpen: boolean;
    onClose: () => void;
  };

const Sidenav = ({ isOpen }: SidenavProps) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['Main items', 'Analytics']);

  const [_mobileOpen, setMobileOpen] = React.useState(false);
  const [_isClosing, setIsClosing] = React.useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  // const handleDrawerToggle = () => {
  //   if (!isClosing) {
  //     setMobileOpen(!mobileOpen);
  //   }
  // };

  const handleExpandClick = (text: string) => {
    setExpandedItems(prev => 
      prev.includes(text) 
        ? prev.filter(item => item !== text)
        : [...prev, text]
    );
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    // if (isMobile) {
    //   setMobileOpen(false);
    // }
  };

  const renderNavigationItems = (items: NavigationItem[], level = 0) => {
    return items.map((item) => {
      if (item.children) {
        const isExpanded = expandedItems.includes(item.text);
        return (
          <React.Fragment key={item.text}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleExpandClick(item.text)}
                sx={{ pl: 2 + level * 2 }}
              >
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    variant: 'caption',
                    color: 'text.secondary',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                />
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderNavigationItems(item.children, level + 1)}
              </List>
            </Collapse>
          </React.Fragment>
        );
      }

      const isActive = location.pathname === item.path;
      return (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            onClick={() => item.path && handleNavigation(item.path)}
            selected={isActive}
            sx={{
              pl: 2 + level * 2,
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main + '20',
                borderRight: `3px solid ${theme.palette.primary.main}`,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main + '30',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: isActive ? theme.palette.primary.main : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      );
    });
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {renderNavigationItems(navigationItems)}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={isOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
export default Sidenav;