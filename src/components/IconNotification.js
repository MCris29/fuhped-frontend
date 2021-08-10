import { React, useState } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { withStyles } from "@material-ui/core/styles";
import { Menu, MenuItem, ListItemText } from "@material-ui/core";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";

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

const IconNotification = () => {
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

  return (
    <>
      <div>
        <NotificationsIcon onClick={handleClick} />

        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {data.meta.total !== 0 ? (
            data.data.map((notification, index) => (
              <StyledMenuItem key={index}>
                <ListItemText primary={notification.title} />
              </StyledMenuItem>
            ))
          ) : (
            <StyledMenuItem>Sin notificaciones</StyledMenuItem>
          )}
        </StyledMenu>
      </div>
    </>
  );
};

export default IconNotification;
