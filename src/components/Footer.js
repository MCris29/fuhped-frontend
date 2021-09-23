import react from "react";
import Link from "@material-ui/core/Link";
import Routes from "@/constants/routes";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import Logo from "@/components/Logo";

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
  texthead: {
    fontFamily: '"Raleway", sans-serif',
    color: theme.palette.text.second,
    fontWeight: "600",
  },
  copyright: {
    color: "#F5F2F6",
    paddingTop: "5em",
  },
  socialMedia: {
    margin: "20px 0",
    color: theme.palette.text.second,
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
}));

const links = [
  {
    title: "Inicio",
    to: Routes.HOME,
  },
  {
    title: "Blog",
    to: Routes.BLOG,
  },
  {
    title: "Nosotros",
    to: "/#about-us",
  },
  {
    title: "Donaciones",
    to: "/#donation",
  },
  {
    title: "Servicios",
    to: Routes.SERVICES,
  },
  {
    title: "Contáctanos",
    to: "/#contact-us",
  },
];

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
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
              <Logo />
            </div>
            <div className={classes.item}>
              <Typography variant="body2">
                La Fundación sin fines de lucro, Halcones por el Deporte fue
                creada con registro ministerial número
                MIES-CZ-9-DDQS-2019-0011-R, misma que tiene por objetivo
                preservar el deporte.
              </Typography>
              <div>
                <Link href={"https://www.facebook.com/FUHPED"} target="_ blank">
                  <FacebookIcon className={classes.socialMedia} />
                </Link>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <Typography variant="h6" className={classes.texthead}>
                Contáctanos
              </Typography>
            </div>
            <div className={classes.item}>
              <Typography variant="h6" className={classes.texthead}>
                Teléfono
              </Typography>
              <Typography variant="body2">+59398 180 7695</Typography>
            </div>
            <div className={classes.item}>
              <Typography variant="h6" className={classes.texthead}>
                Correo
              </Typography>
              <Typography variant="body2">
                fuhpedecuador2019@outlook.com
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4} style={{ padding: "0 40px" }}>
            {links.map((value, index) => (
              <Link href={value.to} key={index} className={classes.item}>
                <Typography>{value.title}</Typography>
              </Link>
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
