import { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {
  Divider,
  Drawer,
  ListItem,
  ListItemText,
  useScrollTrigger,
} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import List from "@material-ui/core/List";
import clsx from "clsx";
import Routes from "@/constants/routes";
import IconMenu from "@/components/IconMenu";
import Icon from "@material-ui/core/Icon";

const drawerWidth = 200;

const mainMenuItems = [
  {
    text: "Inicio",
    to: Routes.HOME,
  },
  {
    text: "Blog",
    to: Routes.HOME,
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
    paddingTop: "20px",
  },
  appBarSize: {
    [theme.breakpoints.up("xs")]: {
      // height: "87px",
    },
    [theme.breakpoints.up("md")]: {
      height: "auto",
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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

export default function MainMenu(props) {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();

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
          <Link href={item.to} key={item.text}>
            <ListItem button onClick={() => setOpenDrawer(false)}>
              <Icon className={classes.icon}>{item.icon}</Icon>
              <ListItemText>{item.text}</ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );

  const logo = <h1>FUHPED</h1>;

  return (
    <div className={classes.grow}>
      <HideOnScroll {...props}>
        <div position="sticky" className={classes.appBar}>
          <Toolbar>
            <Grid container className={classes.appBarSize}>
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
                  {mainMenuItems.map((item) => (
                    <Link href={item.to} key={item.text}>
                      <MenuItem>{item.text}</MenuItem>
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
        </div>
      </HideOnScroll>
      {renderDrawerMenu}
      <Toolbar />
    </div>
  );
}
