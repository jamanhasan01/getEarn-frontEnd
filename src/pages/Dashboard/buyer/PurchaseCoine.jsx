import { useState } from "react";
import PurchaseCoinModel from "../../../modal/PurchaseCoinModel";
import { Link } from "react-router-dom";

const PurchaseCoine = () => {
  const [showmodel, setshowmodel] = useState(false);
  const [planCard, setplanCard] = useState({});

  let handlePurchaseCoin = (plan) => {
    setplanCard(plan);
    setshowmodel(true);
  };

  let purchaseCoinCard = [
    {
      coine: 10,
      price: 1,
    },
    {
      coine: 150,
      price: 10,
    },
    {
      coine: 500,
      price: 20,
    },
    {
      coine: 1000,
      price: 35,
    },
  ];

  return (
    <div className="text-white  border rounded-2xl border-gray-600 p-5">
      <h2 className="text-3xl font-semibold text-center mb-5">Purches Coin</h2>
      <div className="text-right mb-5">
        <Link className="button" to={'/dashboard/buyer/payment_history'}>Payment History</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {purchaseCoinCard.map((plan, i) => (
          <div
            key={i}
            className="bg-gray-700 text-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold mb-3">{plan.coine} Coins</h3>
            <h4 className="text-xl mb-3">${plan.price}</h4>
            <p className="text-sm text-gray-300 mb-4">
              Purchase your coins to enjoy additional features and services.
            </p>
            <button
              onClick={() => {
                handlePurchaseCoin(plan);
              }}
              className="w-full bg-secondary text-white hover:bg-secondary hover:bg-opacity-50 py-2 rounded-md transition duration-200"
            >
              Purchase
            </button>
          </div>
        ))}
      </div>
      <PurchaseCoinModel
        showModel={showmodel}
        setshowmodel={setshowmodel}
        planCard={planCard}
      />
    </div>
  );
};

export default PurchaseCoine;
