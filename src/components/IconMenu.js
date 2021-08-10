import { React, useState } from "react";
import Link from "next/link";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MoreIcon from "@material-ui/icons/MoreVert";
import {
  Menu,
  MenuItem,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
} from "@material-ui/core";
import IconNotification from "@/components/IconNotification";

import { useAuth } from "@/lib/auth";
import Routes from "@/constants/routes";

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
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({}))(MenuItem);

const IconsMenu = () => {
  const { logout, user } = useAuth();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

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

  const handleLogout = async () => {
    logout();
    handleMenuAccountClose();
  };

  const renderMenuAccount = (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleMenuAccountClose}
    >
      {user ? (
        <StyledMenuItem disabled>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          {user.name + " " + user.last_name}
        </StyledMenuItem>
      ) : (
        <div></div>
      )}
      <Divider variant="middle" />

      <Link href={Routes.MENU}>
        <StyledMenuItem onClick={handleMenuAccountClose}>
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>
          Ir al menú
        </StyledMenuItem>
      </Link>

      <StyledMenuItem onClick={handleLogout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        Cerrar sesión
      </StyledMenuItem>
    </StyledMenu>
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
            <MenuItem id="notification-button">
              <IconNotification />
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
