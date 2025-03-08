import { useState } from "react";
import PurchaseCoinModel from "../../../modal/PurchaseCoinModel";

const PurchaseCoine = () => {
  const [showmodel, setshowmodel] = useState(false);
  const [planCard, setplanCard] = useState({});

  let handlePurchaseCoin = (plan) => {
    setplanCard(plan);
    setshowmodel(true);
  };

  let purchaseCoinCard = [
    {
      coine: 100,
      price: 10,
    },
    {
      coine: 500,
      price: 50,
    },
    {
      coine: 1000,
      price: 100,
    },
  ];

  return (
    <div className=" dark:text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {purchaseCoinCard.map((plan, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-700 dark:text-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
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
              className="w-full bg-blue-600 text-white hover:bg-blue-700 py-2 rounded-md transition duration-200"
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
