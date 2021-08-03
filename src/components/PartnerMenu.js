import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Tabs, Tab} from "@material-ui/core";
import Profile from "@/components/Profile";

import { useAuth } from "@/lib/auth";
import ServicesList from "./ServicesList";

const useStyles = makeStyles((theme) => ({
  menuContainer: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    display: "flex",
    height: 224,
    margin: "0 40px",
  },
  tabs: {
    marginTop: "40px",
    borderRadius: theme.border.default,
    backgroundColor: "#fff",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  },
  profile: {
    textTransform: "capitalize",
    padding: "15px 0",
  },
  display: {
    display: "none",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const PartnerMenu = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {user ? (
        <div className={classes.menuContainer}>
          <Grid container>
            <Grid item xs={5} md={2}>
              <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
              >
                <Tab
                  className={classes.profile}
                  label={user.name + " " + user.last_name}
                  {...a11yProps(0)}
                />

                <Tab
                  className={classes.display}
                  label="Servicios"
                  {...a11yProps(1)}
                />
                <Tab
                  className={classes.display}
                  label="Citas"
                  {...a11yProps(2)}
                />
              </Tabs>
              <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
              >
                <Tab
                  className={classes.display}
                  label="Perfil"
                  {...a11yProps(0)}
                />
                <Tab label="Servicios" {...a11yProps(1)} />
                <Tab label="Citas" {...a11yProps(2)} />
              </Tabs>
            </Grid>

            <Grid item xs={7} md={10}>
              <TabPanel value={value} index={0}>
                <Profile />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <ServicesList />
              </TabPanel>
              <TabPanel value={value} index={2}>
                citas
              </TabPanel>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </>
  );
};

export default PartnerMenu;
