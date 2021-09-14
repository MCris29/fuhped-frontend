import React, { useEffect, useState } from "react";
import Script from "next/script";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
} from "@material-ui/core";

const PaypalButton = () => {
  const [value, setValue] = useState(5);

  const handleChange = (event) => {
    // setValue(event.target.value);
    deleteButton();
    paypalButtonRender(event.target.value);
  };

  useEffect(() => {
    paypalButtonRender(value);
  }, []);

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

        payment: function(data, actions) {
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

        onAuthorize: function(data, actions) {
          return actions.payment.execute().then(function(response) {
            console.log("Donación realizada con exito");
          });
        },

        oncancel: function(data) {
          console.log("Pago cancelado");
        },
      },
      "#paypal-express-btn"
    );
  };

  return (
    <>
      <Script
        id="paypal-checkout"
        src="https://www.paypalobjects.com/api/checkout.js"
        strategy="beforeInteractive"
      />
      <Typography variant="body2">Escoje un valor: </Typography>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="value"
          name="gender1"
          value={value}
          onChange={handleChange}
          row
        >
          <FormControlLabel value="5" control={<Radio />} label="$5" />
          <FormControlLabel value="15" control={<Radio />} label="$15" />
          <FormControlLabel value="30" control={<Radio />} label="$30" />
        </RadioGroup>
      </FormControl>
      <div id="paypal-express-btn" />
    </>
  );
};

export default PaypalButton;
