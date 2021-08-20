import React, { useState } from "react";
import Link from "next/link";
import Routes from "@/constants/routes";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {
  Divider,
  Drawer,
  ListItem,
  ListItemText,
  IconButton,
  Icon,
  List,
} from "@material-ui/core";
import clsx from "clsx";

const drawerWidth = 200;

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
  menuButton: {
    marginRight: theme.spacing(2),
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
}));

const NavItemsMobile = () => {
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
    <>
      <div className={classes.sectionMobile}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, openDrawer && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
      </div>
      {renderDrawerMenu}
    </>
  );
};

export default NavItemsMobile;
