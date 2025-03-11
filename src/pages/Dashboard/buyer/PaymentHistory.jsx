import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

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

  console.log("API Response:", payments); //

  if (isLoading) return <p>Loading payment history...</p>;
  if (error) return <p>Error loading payments: {error.message}</p>;

  return (
    <section className="border border-gray-600 bg-gray-800 rounded-2xl p-5 overflow-x-auto">
      <h2 className="text-2xl mb-5 text-center">Payment history</h2>
      <div className="overflow-x-auto">
        <div className="hidden md:block">
          {/* Standard Table for larger screens */}
          <table className="table table-zebra text-center">
            <thead className="bg-gray-700">
              <tr>
                <th>No</th>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Card</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments?.map((payment, idx) => (
                <tr key={payment._id}>
                  <th>{idx + 1}</th>
                  <td className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={payment?.user_photo} alt="payment" />
                    </div>
                  </td>
                  <td>{payment?.user_name}</td>
                  <td>{payment?.user_email}</td>
                  <td>{payment?.card_brand}</td>
                  <td>{payment?.doller_amount}$</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile View: Card Format */}
        <div className="md:hidden">
          {payments?.map((payment, idx) => (
            <div
              key={payment._id}
              className="bg-gray-700 p-4 rounded-lg mb-4 shadow-md w-full"
            >
              <div className="flex items-center gap-3">
                <div className="mask mask-squircle h-12 w-12">
                  <img src={payment?.user_photo} alt="worker" />
                </div>
                <div>
                  <p className="font-semibold">{payment?.user_name}</p>
                  <p className="text-sm text-gray-400">{payment?.user_email}</p>
                </div>
              </div>
              <div className="mt-2">
                <p>
                  <span className="font-semibold">Title:</span>{" "}
                  {payment?.card_brand}
                </p>
                <p>
                  <span className="font-semibold"> Amount:</span>{" "}
                  {payment?.doller_amount}$
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
