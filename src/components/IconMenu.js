import { React, useState } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MoreIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { Menu, MenuItem, Button, Divider } from "@material-ui/core";

import { useAuth } from "@/lib/auth";
import Routes from "../constants/routes";

const useStyles = makeStyles((theme) => ({
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
    marginRight: "-22px",
  },
  text: {
    fontfamily: "Raleway",
    fontStyle: "normal",
    fontSize: "15px",
    padding: "0px 5px",
    margin: "2px",
  },
  button: {
    backgroundColor: theme.palette.primary.second,
    borderRadius: theme.border.default,
    color: theme.palette.text.second,
    textTransform: "none",
    padding: "6px",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  containerIcons: {
    display: "flex",
  },
  icon: {
    marginRight: "4px",
  },
}));

const IconsMenu = () => {
  const { logout, user } = useAuth();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMenuAccountOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuAccountClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuAccountClose();
  };

  const handleLogout = async () => {
    logout();
    handleMenuAccountClose();
  };

  const menuId = "account-menu";
  const renderMenuAccount = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuAccountClose}
    >
      {user ? (
        <MenuItem disabled>
          <AccountCircle className={classes.icon} />
          {user.name + " " + user.last_name}
        </MenuItem>
      ) : (
        <div></div>
      )}
      <Divider variant="middle" />

      <Link href={Routes.MENU}>
        <MenuItem onClick={handleProfile}>
          <MenuIcon className={classes.icon} />
          Menú
        </MenuItem>
      </Link>
      <MenuItem onClick={handleLogout}>
        <ExitToAppIcon className={classes.icon} />
        Cerrar sesión
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "mobile-account-menu";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link href={Routes.LOGIN}>
        <MenuItem className={classes.text}>
          <p>Iniciar sesión</p>
        </MenuItem>
      </Link>
    </Menu>
  );

  return (
    <>
      <div className={classes.sectionDesktop}>
        {user ? (
          <div className={classes.containerIcons}>
            <MenuItem onClick={handleMenuAccountOpen} id="account-menu-button">
              <NotificationsIcon />
            </MenuItem>
            <MenuItem onClick={handleMenuAccountOpen} id="account-menu-button">
              <ArrowDropDownIcon />
            </MenuItem>
          </div>
        ) : (
          <Button className={classes.button}>
            <Link href={Routes.LOGIN}>
              <MenuItem className={classes.text}>Iniciar Sesión</MenuItem>
            </Link>
          </Button>
        )}
      </div>

      <div className={classes.sectionMobile}>
        {user ? (
          <div>
            <MenuItem onClick={handleMenuAccountOpen} id="account-menu-button">
              <ArrowDropDownIcon />
            </MenuItem>
          </div>
        ) : (
          <div>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              id="mobile-account-menu-button"
            >
              <MoreIcon />
            </IconButton>
          </div>
        )}
      </div>
      {renderMenuAccount}
      {renderMobileMenu}
    </>
  );
};

export default IconsMenu;
