import { React, useState } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Menu, MenuItem, ListItemText, Typography } from "@material-ui/core";

import { useAuth } from "@/lib/auth";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import theme from "@/styles/theme";

const useStyles = makeStyles((theme) => ({
  notificationContainer: {
    display: "block",
  },
  IconButton: {
    padding: "0 15px",
    "&:hover": {
      borderRadius: theme.border.default,
      transform: "scale(1.2)",
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
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const { data, error } = useSWR(`/notifications_receiver`, fetcher);

  if (error) return <NotificationsIcon />;
  if (!data) return <NotificationsIcon />;

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
      {user ? (
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
                  <Typography variant="caption" color="textSecondary">
                    {handleDate(notification.created_at)}
                  </Typography>
                </StyledMenuItem>
              ))
            ) : (
              <StyledMenuItem key={"icon-notification"} disabled>
                Sin notificaciones
              </StyledMenuItem>
            )}
          </StyledMenu>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default IconNotification;
