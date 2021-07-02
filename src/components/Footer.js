import react from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    padding: "9em 40px 2em",
  },
  itemContainer: {
    background: theme.palette.primary.third,
    color: theme.palette.text.second,
    width: "100%",
  },
  item: {
    textAlign: "initial",
    padding: "10px 100px 10px 40px",
    color: theme.palette.text.second,
  },
  copyright: {
    color: "#F5F2F6",
    paddingTop: "5em",
  },
}));

const links = [
  {
    title: "Inicio",
    path: "",
  },
  {
    title: "Blog",
    path: "",
  },
  {
    title: "Nosotros",
    path: "",
  },
  {
    title: "Donaciones",
    path: "",
  },
  {
    title: "Servicios",
    path: "",
  },
];

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        fuhped
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <div className={classes.itemContainer}>
        <Grid container className={classes.container}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <Typography variant="h4">FUHPED</Typography>
            </div>
            <div className={classes.item}>
              <Typography variant="body2">
                La Fundación sin fines de lucro, Halcones por el Deporte,
                FUHPED, fue creada con registro ministerial número
                MIES-CZ-9-DDQS-2019-0011-R, misma que tiene por objetivo,
                preservar el deporte.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <Typography variant="h5">Contáctanos</Typography>
            </div>
            <div className={classes.item}>
              <Typography variant="h6">Teléfono</Typography>
              <Typography variant="body2">+59398 180 7695</Typography>
            </div>
            <div className={classes.item}>
              <Typography variant="h6">Correo</Typography>
              <Typography variant="body2">
                fuhpedecuador2019@outlook.com
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            {links.map((value, index) => (
              <div key={index} className={classes.item}>
                <Typography>{value.title}</Typography>
              </div>
            ))}
          </Grid>
          <Grid item xs={12} className={classes.copyright}>
            <Copyright />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Footer;
