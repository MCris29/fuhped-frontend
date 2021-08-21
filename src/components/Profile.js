import React from "react";
import FormProfile from "@/components/FormProfile";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "40px",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "5em",
    },
  },
}));

const Profile = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <FormProfile />
      </div>
    </>
  );
};

export default Profile;
