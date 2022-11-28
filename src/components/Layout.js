import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { signOut, toastShow } from '../store/actions'
import Badge from '@mui/material/Badge';
import CustomButton from '../components/CustomButton';
import CustomSnackbar from '../components/CustomSnackbar';
import useMediaQuery from "@mui/material/useMediaQuery";
import ChaletIcon from '@mui/icons-material/Chalet';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({ children }) {

  let navigate = useNavigate();
  const dispatch = useDispatch()
  const isLogged = useSelector(state => state.user.state);
  const theme = useTheme();
  const isXs = JSON.stringify(useMediaQuery("(max-width:600px)"));
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    console.log('useffect run: ' + isXs)
  }, [isXs])

  const handleLogInfo = () => {
    console.log('rányomtam, és ez az isLogged értéke: ' + isLogged)
    if (isLogged) {
      localStorage.removeItem('user');
      dispatch(signOut())
      dispatch(toastShow(`Sikeres kijelentkezés! `, 'success'))
      navigate('/sign-in')
    } else {
      navigate('/sign-in')
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const GoToSelectedPage = (route) => {
    navigate(route)
  }
  const sumOfQuantity = useSelector(state => state.cart.sumQuantity);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: { xs: 'none', md: 'flex' } }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" id='toolbar-first-element'>
            Juhi's web App
          </Typography>
          <Typography variant="h6" >
            {!isLogged ? <CustomButton
              value='Sign in'
              color={'primary'}
              variant={'contained'}
              disableElevation={true}
              onClick={handleLogInfo} />
              : <CustomButton
                value='Sign Out'
                color={'primary'}
                variant={'contained'}
                disableElevation={true}
                onClick={handleLogInfo} />}
          </Typography>
        </Toolbar>

      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Tooltip title="Home" placement="right-start">
            <ListItem disablePadding sx={{ display: 'block'}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                                      }}
                  onClick={() => GoToSelectedPage('/')}
                >
                  <ChaletIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} sx={{ opacity: open ? 1 : 0 }}
                  onClick={() => GoToSelectedPage('/')} />
              </ListItemButton>
            </ListItem>
          </Tooltip>
          <Tooltip title="Products" placement="right-start">
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                  onClick={() => GoToSelectedPage('/products')}
                >
                  <SportsSoccerIcon />
                </ListItemIcon>
                <ListItemText primary={"Products"} sx={{ opacity: open ? 1 : 0 }}
                  onClick={() => GoToSelectedPage('/products')} />
              </ListItemButton>
            </ListItem>
          </Tooltip>
          <Tooltip title="Cart" placement="right-start">
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                  onClick={() => GoToSelectedPage('/users/shopping-cart')}
                >
                  <Badge badgeContent={sumOfQuantity} color="primary">
                  <ShoppingCartIcon />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary={"Cart"} sx={{ opacity: open ? 1 : 0 }}
                  onClick={() => GoToSelectedPage('/users/shopping-cart')} />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{
        flexGrow: 1,
        p: 3,
        mx: { xs: 0, md: 16 },
        mt: 8
      }}>
        <CustomSnackbar />
        {children}
      </Box>
    </Box>
  );
}
