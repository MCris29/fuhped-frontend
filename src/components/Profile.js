import React from "react";
import FormProfile from "@/components/FormProfile";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "40px",
    padding: "40px",
    borderRadius: theme.border.default,
    backgroundColor: "#fff",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    display: "flex",
    justifyContent: "center",
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
