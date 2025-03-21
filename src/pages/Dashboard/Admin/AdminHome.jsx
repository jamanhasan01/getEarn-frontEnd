import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import LoadingPage from "../../../shared/LoadingPage";
import WithdrawTable from "./WithdrawTable";

const AdminHome = () => {
  let { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  let { data:total_count, refetch:total_count_refatch, isLoading } = useQuery({
    queryKey: ["users_filter",user?.email],
    queryFn: async () => {
      let res = await axiosPrivate("/users_filter");
      return res?.data;
    },
  });

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }
  let { total_worker, total_buyer, total_coin ,total_paid}=total_count


  return (
    <section>
      <div className="mb-8 border border-gray-600  p-5 rounded-2xl">
        <h2 className="text-3xl font-bold mb-6 text-white">
          Dashboard Overview
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Total Worker */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-center text-lg font-medium text-gray-400">
              Total Worker
            </h3>
            <h2 className="text-center text-3xl font-bold text-gray-100">
              {total_worker}
            </h2>
          </div>
          {/* Total Buyer */}
          <div className="bg-[#2d1b00] p-6 rounded-xl shadow-md border-l-4 border-orange-500">
            <h3 className="text-center text-lg font-medium text-orange-400">
              Total Buyer
            </h3>
            <h2 className="text-center text-3xl font-bold text-orange-300">
              {total_buyer}
            </h2>
          </div>
          {/* Total user coins */}
          <div className="bg-[#002d19] p-6 rounded-xl shadow-md border-l-4 border-green-[#FFD700]">
            <h3 className="text-center text-lg font-medium text-green-400">
              Total User Coins
            </h3>
            <h2 className="text-center text-3xl font-bold text-green-300">
              {total_coin}
            </h2>
          </div>
          {/* Total paid Doller */}
          <div className="bg-[#594b0f] p-6 rounded-xl shadow-md border-l-4 border-green-[#FFD700]">
            <h3 className="text-center text-lg font-medium text-[#ebc933]">
              Total Paid Doller
            </h3>
            <h2 className="text-center text-3xl font-bold text-[#ebc933]">
              {total_paid}$
            </h2>
          </div>
        </div>
      </div>
      <WithdrawTable total_count_refatch={total_count_refatch}></WithdrawTable>
    </section>
  );
};

export default AdminHome;
