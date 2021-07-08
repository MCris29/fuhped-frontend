import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useAuth } from "@/lib/auth";
import Link from "next/link";
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
  buttonLogin: {
    backgroundColor: theme.palette.primary.second,
    borderRadius: "10px",
    color: theme.palette.text.second,
    padding: "6px",
  },
}));

const IconsMenu = () => {
  const { logout, user } = useAuth();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMenuAccountOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuAccountClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfile = async () => {
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
      <Link href={Routes.HOME}>
        <MenuItem onClick={handleProfile}>Perfil</MenuItem>
      </Link>
      <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
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
          <MenuItem onClick={handleMenuAccountOpen} id="account-menu-button">
            <AccountCircle style={{ marginRight: 5 }} />
            {user.name}
          </MenuItem>
        ) : (
          <Link href={Routes.LOGIN}>
            <div style={{ display: "flex" }} className={classes.buttonLogin}>
              <MenuItem className={classes.text}>Iniciar Sesión</MenuItem>
            </div>
          </Link>
        )}
      </div>

      <div className={classes.sectionMobile}>
        {user ? (
          <div>
            <MenuItem onClick={handleMenuAccountOpen} id="account-menu-button">
              <AccountCircle /> {user.name}
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
