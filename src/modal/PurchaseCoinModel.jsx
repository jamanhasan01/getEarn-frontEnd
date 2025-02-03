import { useState } from "react";
import Payment from "../pages/Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../pages/Payment/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);
const PurchaseCoinModel = ({ showModel, setshowmodel, planCard }) => {
 

  return (
    <div>
      
      {showModel && (
        <div className="fixed left-0 top-0 w-full h-full z-50 bg-white/30">
          <div className="fixed left-[50%] top-[50%] w-3/6 bg-white -translate-x-[50%] -translate-y-[50%] p-3 text-gray-800">
            <Elements stripe={stripePromise}>
              <CheckoutForm setshowmodel={setshowmodel} planCard={planCard}></CheckoutForm>
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseCoinModel;
