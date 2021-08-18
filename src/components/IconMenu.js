import { React, useState } from "react";
import Link from "next/link";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MoreIcon from "@material-ui/icons/MoreVert";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
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
  divider: {
    marginTop: "5px",
    marginBottom: "5px",
  },
  menuButton: {
    "&:hover": {
      color: theme.palette.primary.second,
      backgroundColor: theme.palette.background.default,
      borderRadius: theme.border.default,
      transform: "scale(1.1)",
    },
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
      <Divider variant="middle" className={classes.divider} />

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

  return (
    <>
      <div className={classes.sectionDesktop}>
        {user ? (
          <div className={classes.containerIcons}>
            <MenuItem id="notification-button" className={classes.menuButton}>
              <IconNotification />
            </MenuItem>
            <MenuItem
              onClick={handleMenuAccountOpen}
              id="account-menu-button"
              className={classes.menuButton}
            >
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
          <Link href={Routes.LOGIN}>
            <AccountCircleIcon />
          </Link>
        )}
      </div>
      {renderMenuAccount}
    </>
  );
};

export default IconsMenu;
