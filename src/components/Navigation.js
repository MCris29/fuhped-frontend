import { React, useState, cloneElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../pages/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "next/link";
import Routes from "@/constants/routes";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {
  Divider,
  Drawer,
  ListItem,
  ListItemText,
  useScrollTrigger,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Icon,
  List,
} from "@material-ui/core";
import IconMenu from "@/components/IconMenu";
import PropTypes from "prop-types";
import clsx from "clsx";

const drawerWidth = 200;
const logo = <h1>FUHPED</h1>;

const mainMenuItems = [
  {
    text: "Inicio",
    to: Routes.HOME,
  },
  {
    text: "Blog",
    to: Routes.BLOG,
  },
  {
    text: "Servicios",
    to: Routes.SERVICES,
  },
  {
    text: "Donaciones",
    to: "/#donation",
  },
  {
    text: "Nosotros",
    to: "/#about-us",
  },
  {
    text: "Contáctanos",
    to: "/#contact-us",
  },
];

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.main,
    maxHeight: 180,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    textTransform: "none",
    "&:hover": {
      backgroundColor: "rgb(0, 0, 0, 0)",
      borderRadius: theme.border.default,
      transform: "scale(1.1)",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  gridContainer: {
    [theme.breakpoints.up("md")]: {
      padding: "0 40px",
    },
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 7 : 0,
    // style: {
    //   backgroundColor: trigger
    //     ? theme.palette.background.default
    //     : theme.palette.primary.third,
    //   color: trigger ? theme.palette.text.main : theme.palette.text.second,
    // },
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const MainMenu = (props) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const renderDrawerMenu = (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      anchor="left"
      open={openDrawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      onClose={handleDrawerClose}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {mainMenuItems.map((item, index) => (
          <Link href={item.to} key={"movil" + index}>
            <ListItem button onClick={() => setOpenDrawer(false)}>
              <Icon className={classes.icon}>{item.icon}</Icon>
              <ListItemText>{item.text}</ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );

  return (
    <div className={classes.grow}>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar className={classes.appBar}>
          <Toolbar id="back-to-top-anchor">
            <Grid container className={classes.gridContainer}>
              <Grid item xs={2} style={{ display: "flex" }}>
                <div className={classes.sectionMobile}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(
                      classes.menuButton,
                      openDrawer && classes.hide
                    )}
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
                <div className={classes.sectionDesktop}>{logo}</div>
              </Grid>
              <Grid item xs={8} className={classes.drawerHeader}>
                <div className={classes.grow} />

                <div className={classes.sectionDesktop}>
                  {mainMenuItems.map((item, index) => (
                    <Link href={item.to} key={"desktop" + index}>
                      <MenuItem className={classes.link}>{item.text}</MenuItem>
                    </Link>
                  ))}
                </div>
                <div className={classes.sectionMobile}>{logo}</div>
                <div className={classes.grow} />
              </Grid>
              <Grid item xs={2} className={classes.drawerHeader}>
                <IconMenu />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {renderDrawerMenu}
      <Toolbar />
    </div>
  );
};

export default MainMenu;
