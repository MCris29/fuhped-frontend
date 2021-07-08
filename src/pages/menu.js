import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.primary.main}`,
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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

const Menu = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Perfil" {...a11yProps(0)} />
          <Tab label="Notificaciones" {...a11yProps(1)} />
          <Tab label="Blog" {...a11yProps(2)} />
          <Tab label="Socios" {...a11yProps(3)} />
          <Tab label="Afiliados" {...a11yProps(4)} />
          <Tab label="Citas" {...a11yProps(5)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          Perfil
        </TabPanel>
        <TabPanel value={value} index={1}>
          Notificaciones
        </TabPanel>
        <TabPanel value={value} index={2}>
          Blog
        </TabPanel>
        <TabPanel value={value} index={3}>
          Socios
        </TabPanel>
        <TabPanel value={value} index={4}>
          Afiliados
        </TabPanel>
        <TabPanel value={value} index={5}>
          Citas
        </TabPanel>
      </div>
    </>
  );
};

export default Menu;
