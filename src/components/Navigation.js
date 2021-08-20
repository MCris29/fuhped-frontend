import React, { cloneElement } from "react";
import Link from "next/link";
import Routes from "@/constants/routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { useScrollTrigger, Grid, AppBar, Toolbar } from "@material-ui/core";
import IconMenu from "@/components/IconMenu";
import PropTypes from "prop-types";

const logo = (
  <Link href={Routes.HOME}>
    <h1>FUHPED</h1>
  </Link>
);

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.main,
    maxHeight: 180,
  },
  grow: {
    flexGrow: 1,
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

const MainMenu = (prop) => {
  const classes = useStyles();

  ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
  };

  function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });

    return cloneElement(children, {
      elevation: trigger ? 7 : 0,
      style: {
        backgroundColor: trigger
          ? prop.backgroundColorOne
          : prop.backgroundColorTwo,
        color: trigger ? prop.textColorOne : prop.textColorTwo,
      },
    });
  }

  return (
    <div className={classes.grow}>
      <CssBaseline />
      <ElevationScroll>
        <AppBar className={classes.appBar}>
          <Toolbar id="back-to-top-anchor">
            <Grid container className={classes.gridContainer}>
              <Grid item xs={2} style={{ display: "flex" }}>
                {prop.navItemsMobile}
                <div className={classes.sectionDesktop}>{logo}</div>
              </Grid>
              <Grid item xs={8} className={classes.drawerHeader}>
                <div className={classes.grow} />
                {prop.navItems}
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
      <Toolbar />
    </div>
  );
};

export default MainMenu;
