import { React, useState, cloneElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "next/link";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
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
  Slide,
} from "@material-ui/core";
import Routes from "@/constants/routes";
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
    to: Routes.HOME,
  },
  {
    text: "Donaciones",
    to: Routes.HOME,
  },
  {
    text: "Nosotros",
    to: Routes.HOME,
  },
  {
    text: "Contáctanos",
    to: Routes.HOME,
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
      color: theme.palette.primary.second,
      backgroundColor: theme.palette.background.default,
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
    padding: "0 40px",
  },
}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
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
