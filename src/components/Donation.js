import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    padding: "9em 40px",
  },
  itemContainer: {
    background: theme.palette.primary.main,
    color: theme.palette.text.second,
  },
  space: {
    padding: "3em 0",
  },
  button: {
    padding: "7px 25px",
    borderRadius: "10px",
    backgroundColor: theme.palette.background.default,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const Donation = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <div className={classes.itemContainer}>
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={12} md={6}>
            <Image
              src="/donation.svg"
              alt="Donaciones"
              width={750}
              height={350}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.space}>
              <Typography variant="h4">Donaciones</Typography>
            </div>
            <Typography variant="body1">
              Lorem Ipsum ssd klpo Lorem Ipsum sd wejj Lorem Iwepsum sdsas
              Lorems Ipsum sd ewrew Lorem Ipsssum sdisio Lorem Ipsum sd klpo
              Loudirem Ipsumri sad wejj Lorepsum sdsas Lorpsum sd ewrew Lorem
              Ipsum sd Lorem Ipsum sd klpo Ipsumsa sd wejj Lorem Ips sdsas
              Lorexm Ipsum sd ewrew Lorem Ipsum sd{" "}
            </Typography>
            <div className={classes.space}>
              <Button variant="contained" className={classes.button}>
                Donar
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Donation;
