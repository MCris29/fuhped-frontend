import React, { useState } from "react";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
} from "@material-ui/core";
import PaypalButton from "@/components/PaypalButton";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    padding: "9em 40px",
  },
  itemContainer: {
    background: theme.palette.primary.main,
    color: theme.palette.text.second,
    width: "100%",
  },
  space: {
    padding: "3em 0",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    margin: "10px 0",
    padding: "7px 25px",
    borderRadius: "10px",
    backgroundColor: theme.palette.background.default,
    width: "19em",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const Donation = () => {
  const classes = useStyles();
  // const [value, setValue] = useState(10);

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

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
              <Typography variant="h4">Realiza tu Donación</Typography>
            </div>
            {/* <FormControl component="fieldset">
              <RadioGroup
                aria-label="value"
                name="gender1"
                value={value}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="10" control={<Radio />} label="$10" />
                <FormControlLabel value="20" control={<Radio />} label="$20" />
                <FormControlLabel value="50" control={<Radio />} label="$50" />
              </RadioGroup>
            </FormControl> */}
            <PaypalButton />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Donation;
