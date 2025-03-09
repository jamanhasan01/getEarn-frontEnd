import { useQuery } from "@tanstack/react-query";
import SubmissionTask from "../../../components/SubmissionBuyerTask";

import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useBuyer from "../../../hooks/useBuyer";

const BuyerHome = () => {
  let [totalPaidCoin, settotalPaidCoin] = useState(0);
  let [isBuyer] = useBuyer();

  let { user } = useAuth();
  let {
    data: tasks = [],
    refetch: refetchTask,
    isLoading,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      let res = await useAxiosPrivate(`/submission_task/buyer/${user?.email}`);
      return res.data;
    },
  });
  console.log(refetchTask);

  let pending_count = tasks?.reduce((acc, item) => {
    return item.status == "pending" ? acc + 1 : acc;
  }, 0);


  return (
    <section className="p-3 md:p-6 border rounded-2xl border-gray-600 min-h-screen text-gray-200">
    {/* Stats Section */}
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-6 text-white">Dashboard Overview</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Total Submissions */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-center text-lg font-medium text-gray-400">
            Total Submissions
          </h3>
          <h2 className="text-center text-3xl font-bold text-gray-100">{tasks?.length}</h2>
        </div>
        {/* Total Pending */}
        <div className="bg-[#2d1b00] p-6 rounded-xl shadow-md border-l-4 border-orange-500">
          <h3 className="text-center text-lg font-medium text-orange-400">
            Total Pending
          </h3>
          <h2 className="text-center text-3xl font-bold text-orange-300">{pending_count}</h2>
        </div>
        {/* Total Paid Coins */}
        <div className="bg-[#002d19] p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <h3 className="text-center text-lg font-medium text-green-400">
            Total Paid Coins
          </h3>
          <h2 className="text-center text-3xl font-bold text-green-300">
            {isBuyer.user.paid_coins}
          </h2>
        </div>
      </div>
    </div>
  
    {/* Task Review Section */}
    <div className="bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-300">Task To Review</h2>
      <SubmissionTask settotalPaidCoin={settotalPaidCoin} totalPaidCoin={totalPaidCoin} />
    </div>
  </section>
  
  
  );
};

export default BuyerHome;
