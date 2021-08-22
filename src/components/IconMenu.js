import { React, useState } from "react";
import Link from "next/link";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  Menu,
  MenuItem,
  Button,
  Divider,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import IconNotification from "@/components/IconNotification";

import { useAuth } from "@/lib/auth";
import Routes from "@/constants/routes";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
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
  divider: {
    marginTop: "5px",
    marginBottom: "5px",
  },
  IconButton: {
    padding: "0 15px",
    "&:hover": {
      borderRadius: theme.border.default,
      transform: "scale(1.2)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0",
    },
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
  },
  textName: {
    paddingLeft: "5px",
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    borderRadius: "10px",
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

const IconsMenu = (prop) => {
  const { logout, user } = useAuth();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

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
          Ir al sistema
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
      {user ? (
        <div className={classes.iconContainer}>
          <IconNotification />
          {prop.typeIcon === 1 ? (
            <div
              className={classes.IconButton}
              onClick={handleMenuAccountOpen}
              id="account-menu-button"
            >
              <ArrowDropDownIcon />
            </div>
          ) : (
            <div
              className={classes.iconContainer}
              onClick={handleMenuAccountOpen}
              id="account-user-button"
            >
              <AccountCircle />
              <div className={classes.sectionDesktop}>
                <Typography variant="body2" className={classes.textName}>
                  {user.name}
                </Typography>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className={classes.sectionDesktop}>
            <Button className={classes.button}>
              <Link href={Routes.LOGIN}>
                <MenuItem className={classes.text}>Iniciar Sesión</MenuItem>
              </Link>
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <Link href={Routes.LOGIN}>
              <AccountCircleIcon />
            </Link>
          </div>
        </div>
      )}
      {renderMenuAccount}
    </>
  );
};

export default IconsMenu;
