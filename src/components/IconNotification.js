import { React, useState } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Menu,
  MenuItem,
  ListItemText,
  Typography,
  IconButton,
} from "@material-ui/core";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import theme from "src/pages/theme";

const useStyles = makeStyles((theme) => ({
  notificationContainer: {
    display: "block",
  },
  IconButton: {
    color: theme.palette.text.main,
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
    borderRadius: theme.border.default,
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

const IconNotification = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { data, error, mutate } = useSWR(`/notifications_receiver`, fetcher);

  if (error) return <div>No se pudo cargar la información</div>;
  if (!data) return <div>Cargando...</div>;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDate = (date) => {
    const notificationDate = [];
    for (let i = 0; i <= 15; i++) {
      if (date[i] !== "T") {
        notificationDate[i] = date[i];
      } else {
        notificationDate[i] = " ";
      }
    }

    return notificationDate;
  };

  return (
    <>
      <div>
        <div className={classes.IconButton} onClick={handleClick}>
          <NotificationsIcon />
        </div>

        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {data.meta.total !== 0 ? (
            data.data.map((notification, index) => (
              <StyledMenuItem
                className={classes.notificationContainer}
                key={index}
              >
                <ListItemText primary={notification.title} />
                <Typography variant="caption">
                  {"Asignado con fecha "}
                  {handleDate(notification.created_at)}
                </Typography>
              </StyledMenuItem>
            ))
          ) : (
            <StyledMenuItem key={"icon-notification"}>
              Sin notificaciones
            </StyledMenuItem>
          )}
        </StyledMenu>
      </div>
    </>
  );
};

export default IconNotification;
