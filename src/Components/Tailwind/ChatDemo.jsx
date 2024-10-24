import React from "react";
import { PayPalScriptProvider, PayPalButtons, BraintreePayPalButtons } from "@paypal/react-paypal-js";
import { PAYPAL_ID } from "../../Common/API/domain";
import { PayPalButton } from "react-paypal-button-v2";

export default function ChatDemo() {
  return (
    <div>
      <PayPalButton
        amount="0.01"
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);

          // OPTIONAL: Call your server to save the transaction
          
        }}
      />
    </div>
  );
}
