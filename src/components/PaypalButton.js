import React, { useEffect, useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
} from "@material-ui/core";

const PaypalButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [value, setValue] = useState(10);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    paypalButtonRender(value);

    return () => deleteButton();
  }, [value]);

  function deleteButton() {
    var div = document.getElementById("paypal-express-btn");
    if (div !== null) {
      while (div.hasChildNodes()) {
        div.removeChild(div.lastChild);
      }
    } else {
      console.log("No existe el botón previamente creado.");
    }
  }

  const paypalButtonRender = (value) => {
    setIsEnabled(true);
    paypal.Button.render(
      {
        env: "sandbox",
        client: {
          sandbox:
            "AT98cbWczJGAusdaGRDq6CwOjDgP7TyBqMq70ya4xjcZhHZ2M5FphaNNtj0ZLkCsT6kzShL_7TITyqDl",
          production: "xxxxxx",
        },

        style: {
          layout: "vertical",
          color: "black",
          shape: "pill",
          label: "paypal",
          height: 40,
        },

        payment: function (data, actions) {
          return actions.payment.create({
            transactions: [
              {
                amount: {
                  total: value,
                  currency: "USD",
                },
              },
            ],
          });
        },

        commit: true,

        onAuthorize: function (data, actions) {
          return actions.payment.execute().then(function (response) {
            console.log("Donación realizada con exito");
          });
        },

        oncancel: function (data) {
          console.log("Pago cancelado");
        },
      },
      "#paypal-express-btn"
    );
  };

  return (
    <>
      <Typography variant="body2">Escoje un valor: </Typography>
      <FormControl component="fieldset">
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
      </FormControl>
      <div>{isEnabled ? <div id="paypal-express-btn" /> : "Cargando..."}</div>
    </>
  );
};

export default PaypalButton;
