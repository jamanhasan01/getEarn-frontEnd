import { useState } from "react";
import useCoins from "../../../hooks/useCoins";
import axios from "axios";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import moment from "moment/moment";

const Withdrawals = () => {
  let { user } = useAuth();
  const [coinAmount, setCoinAmount] = useState("");
  const [dollarAmount, setDollarAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("bikash");
  const [coinErrorMsg, setCoinErrorMsg] = useState(
    "Minimum withdrawal amount: 200 coins"
  );
  const [isvalidCoin, setisvalidCoin] = useState(false);
  const [coins, refetchCoins] = useCoins();
  let axiosPrivate = useAxiosPrivate();
  
  // BD phone number validation regex
  const BD_PHONE_REGEX = /^(?:\+?88)?01[3-9]\d{8}$/;

  const handleConvertDollar = (e) => {
    const coin = e.target.value;
    setCoinAmount(coin);
    setDollarAmount(coin / 20);

    // Convert to number for comparison
    const numericCoin = Number(coin);

    // Validate coin amount
    if (numericCoin < 200) {
      setCoinErrorMsg("Minimum withdrawal amount: 200 coins");
      setisvalidCoin(false);
      return;
    }

    if (coins < numericCoin) {
      setCoinErrorMsg("Insufficient coin");
      setisvalidCoin(false);

      return;
    }

    // Clear error if valid
    setCoinErrorMsg("");
    setisvalidCoin(true);
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/[^+\d]/g, "");
    setPhoneNumber(input);
    setIsValidPhone(BD_PHONE_REGEX.test(input));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    setPhoneNumber("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation check
    const numericCoin = Number(coinAmount);
    if (
      !BD_PHONE_REGEX.test(phoneNumber) ||
      numericCoin < 200 ||
      coins < numericCoin
    ) {
      setIsValidPhone(BD_PHONE_REGEX.test(phoneNumber));
      return;
    }

    const withdrawObj = {
      withdraw_coin: numericCoin,
      withdraw_amount: dollarAmount,
      payment_system: paymentMethod,
      phone: phoneNumber,
      status: "pending",
      worker_email: user?.email,
      worker_name: user?.displayName,
      worker_photo: user?.photoURL,
      date:moment().format('L')
    };

    
    // this api for request save withdraw data in database
    try {
      let res = await axiosPrivate.post("/withdraw", withdrawObj);

      if (res.status == 200) {
        toast.success(res.data.message);
        refetchCoins();

        // Reset form fields
        setCoinAmount("");
        setDollarAmount("");
        setPhoneNumber("");
        setPaymentMethod("bikash");
        setIsValidPhone(true);
        setCoinErrorMsg("Minimum withdrawal amount: 200 coins");
        setisvalidCoin(false);
      } else {
        toast.error(res.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="flex items-center justify-center p-3 md:p-0 h-full w-full text-white">
   
        <div className="card  bg-gray-800 p-6 w-full max-w-lg shadow-lg rounded-lg">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold text-center">Withdraw</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="number"
                name="coin"
                value={coinAmount}
                onChange={handleConvertDollar}
                placeholder="Enter coins"
                className="input input-bordered bg-gray-700 text-white"
                min="0"
                required
              />

              <input
                type="number"
                name="dollar"
                value={dollarAmount}
                placeholder="Convart To Amount..."
                className="input input-bordered bg-gray-700 text-white"
                readOnly
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                value={paymentMethod}
                onChange={handlePaymentChange}
                className="select bg-gray-700 text-white"
              >
                <option value="bikash">Bikash</option>
                <option value="nagad">Nagad</option>
                <option value="rocket">Rocket</option>
              </select>

              <div className="relative mb-3">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder={`Enter ${paymentMethod} number`}
                  className={`input input-bordered w-full bg-gray-700 text-white ${
                    !isValidPhone ? "border-red-500" : ""
                  }`}
                  pattern="^(?:\+?88)?01[3-9]\d{8}$"
                  maxLength={14}
                  required
                />
                {!isValidPhone && (
                  <span className="absolute left-0 top-full text-red-500 text-sm mt-1">
                    Invalid {paymentMethod} number
                  </span>
                )}
              </div>
            </div>

            <div>
              {coinErrorMsg && (
                <p className="text-red-600 text-center my-1">{coinErrorMsg}</p>
              )}

              {isvalidCoin && (
                <button
                  disabled={!isvalidCoin || !isValidPhone}
                  type="submit"
                  className="btn bg-blue-600 hover:bg-blue-700 text-white w-full disabled:bg-gray-500 disabled:text-white/30"
                >
                  Withdraw
                </button>
              )}
            </div>
          </form>
        </div>
 
    </section>
  );
};

export default Withdrawals;
