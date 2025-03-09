import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { use } from "react";
import { toast } from "react-toastify";
import useCoins from "../../hooks/useCoins";

const CheckoutForm = ({ setshowmodel, planCard }) => {
  const [error, seterror] = useState("");
  let stripe = useStripe();
  let elements = useElements();
  let axiosPrivate = useAxiosPrivate();
  const [clineSecret, setclineSecret] = useState("");
  let { user } = useAuth();
  let [coins, refetch] = useCoins();
  const [PurchaseCoinAdd, setPurchaseCoinAdd] = useState(0)

  let handleClineSecret = async () => {

    let { data } = await axiosPrivate.post(
      "/create-checkout-session",
      planCard
    );
    setPurchaseCoinAdd(data.coins);

    setclineSecret(data.client_secret);
  };

  useEffect(() => {
    handleClineSecret();
  }, [setclineSecret]);



  let handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    let { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error ", error);
      seterror(error.message);
    } else {
      console.log("payment method ", paymentMethod);
      seterror("");
    }

    let { paymentIntent } = await stripe.confirmCardPayment(clineSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });
    console.log(paymentIntent);
    console.log(PurchaseCoinAdd);
    
    if (paymentIntent.status == "succeeded") {
      let res = await axiosPrivate.patch(`/users/buyer/${user?.email}`, {
        coins: coins +PurchaseCoinAdd,
      });
      if (res.data.modifiedCount > 0) {
        toast.success(`You get ${PurchaseCoinAdd}`);

        setshowmodel(false);
      }

      refetch();
    }
    else{
      toast.error(paymentIntent.status)
    }
  }

  return (
    <div className="p-5">
      <form className=" flex flex-col gap-3" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        ></CardElement>
        <div className=" flex gap-3">
          <button
            className="button w-full"
            type="submit"
            disabled={!stripe || !elements}
          >
            Purchase Coine
          </button>
          <button onClick={() => setshowmodel(false)} className="button w-full">
            Cancel
          </button>
        </div>
      </form>
      <p className=" text-red-700 mt-5">{error}</p>
    </div>
  );
};

export default CheckoutForm;
