import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import moment from "moment/moment";
import LoadingPage from "../../../shared/LoadingPage";
import default_avatar from '../../../assets/default_avatar.jpg'

const PaymentHistory = () => {
  let { user } = useAuth();
  let axiosPrivate = useAxiosPrivate();

  let {
    data: payments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      let res = await axiosPrivate.get(`/payment_history/${user?.email}`);
      return res?.data;
    },
  });

  if (isLoading) return <LoadingPage />;
  if (error) return <p className="text-red-500">Error loading payments: {error.message}</p>;

  return (
    <section className="border border-gray-600 bg-gray-800 rounded-2xl p-5 overflow-x-auto">
      <h2 className="text-2xl font-bold text-white mb-5 text-center">Payment History</h2>
      <div className="overflow-x-auto">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <table className="table table-zebra text-center">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th>No</th>
                <th>Card</th>
                <th>Number</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((payment, idx) => (
                <tr key={payment._id}>
                  <th>{idx + 1}</th>
                  <td>{payment?.card_brand}</td>
                  <td>{payment?.last_num_of_card}</td>
                  <td>{moment(payment?.date).format("MMM Do YY")}</td>
                  <td className="font-semibold text-green-400">{payment?.doller_amount}$</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Card Format */}
        <div className="md:hidden">
          {payments?.map((payment, idx) => (
            <div key={payment._id} className="bg-gray-700 p-5 rounded-lg mb-4 shadow-md w-full">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-500">
                  <img
                    src={payment?.user_photo ||default_avatar }
                    alt="worker"
                    className="h-full w-full object-cover"
                    onError={
                      (e)=>{
                        e.target.src=default_avatar
                      }
                    }
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">{payment?.user_name}</p>
                  <p className="text-sm text-gray-300">{payment?.user_email}</p>
                </div>
              </div>
              <div className="mt-3 text-white">
                <p>
                  <span className="font-semibold">Card:</span> {payment?.card_brand}
                </p>
                <p>
                  <span className="font-semibold">Amount:</span>{" "}
                  <span className="text-green-400 font-bold">{payment?.doller_amount}$</span>
                </p>
                <p>
                  <span className="font-semibold">Date:</span> {moment(payment?.date).format("MMM Do YY")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaymentHistory;
