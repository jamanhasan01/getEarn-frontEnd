import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import LoadingPage from "../../../shared/LoadingPage";

const WokerHome = () => {
  let axiosPrivate = useAxiosPrivate();
  let { user } = useAuth();

  let {
    data: tasks = [],
    refetch: refetchTask,
    isLoading,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      let res = await axiosPrivate(`/submission_task/worker/${user?.email}`);
      return res.data;
    },
  });

if (isLoading) {
   return <LoadingPage></LoadingPage>
}

  // Count pending submissions
  let pending_count = tasks?.reduce((acc, item) => {
    return item.status == "pending" ? acc + 1 : acc;
  }, 0);

  let earn_count = tasks?.reduce((acc, item) => {
    return item.status == "approved" ? acc + item.payable_amount : acc;
  }, 0);

  let approve_data = tasks?.filter((item) => item.status == "approved");

  return (
    <section className="p-6 min-h-screen text-gray-200">
      {/* Stats Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-white">
          Dashboard Overview
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Total Submissions */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-md">
            <h3 className="text-center text-lg font-medium text-gray-400">
              Total Submissions
            </h3>
            <h2 className="text-center text-3xl font-bold text-gray-100">
              {tasks?.length}
            </h2>
          </div>
          {/* Total Pending */}
          <div className="bg-[#2d1b00] p-6 rounded-xl shadow-md border-l-4 border-orange-500">
            <h3 className="text-center text-lg font-medium text-orange-400">
              Total Pending
            </h3>
            <h2 className="text-center text-3xl font-bold text-orange-300">
              {pending_count}
            </h2>
          </div>
          {/* Total Earnings */}
          <div className="bg-[#002d19] p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <h3 className="text-center text-lg font-medium text-green-400">
              Total Earnings
            </h3>
            <h2 className="text-center text-3xl font-bold text-green-300">
              {earn_count}
            </h2>
          </div>
        </div>
      </div>

      {/* Approved Submissions Table */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-300">
          Approved Submissions
        </h2>
        <div className="overflow-x-auto">
         <div className="hidden md:block">
         <table className="table w-full text-gray-200">
            {/* Table Header */}
            <thead className="bg-gray-700">
              <tr >
                <th className="py-3 text-center">#</th>
                <th className="py-3 text-center">Title</th>
                <th className="py-3 text-center">Buyer Name</th>
                <th className="py-3 text-center">Payable Amount</th>
                <th className="py-3 text-center">Status</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {approve_data?.map((submission,i) => (
                <tr key={submission._id} className="border-b border-gray-600">
                  <td className="text-center">{i+1}</td>
                  <td className="flex justify-center py-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={submission?.taskImage} alt="Task Image" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{submission.task_title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">{submission.buyer_name}</td>
                  <td className="text-center font-bold text-lg">
                    {submission.payable_amount}
                  </td>
                  <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full font-medium capitalize text-white 
                    ${submission.status === "pending" ? "bg-orange-500" : ""}
                    ${submission.status === "approved" ? "bg-green-500" : ""}
                    ${submission.status === "reject" ? "bg-red-500" : ""}`}
                    >
                      {submission.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
         </div>
         {/* Cards for Mobile */}
  <div className="flex flex-col md:hidden space-y-4">
    {approve_data?.map((submission, i) => (
      <div key={submission._id} className="bg-gray-700 p-5 rounded-lg shadow-md">
        <div className="flex flex-col items-start gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-16 w-16">
              <img src={submission?.taskImage} alt="Task Image" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">{submission.task_title}</h3>
            <p className="text-gray-400 text-sm">Buyer: {submission.buyer_name}</p>
            <p className="text-green-400 font-bold text-sm">
              Earned: {submission.payable_amount} Coins
            </p>
          </div>
          <div className=" text-right">
          <span
            className={`px-3 py-1 text-sm rounded-full font-medium capitalize text-white 
              ${submission.status === "pending" ? "bg-orange-500" : ""}
              ${submission.status === "approved" ? "bg-green-500" : ""}
              ${submission.status === "reject" ? "bg-red-500" : ""}`}
          >
            {submission.status}
          </span>
        </div>
        </div>
    
      </div>
    ))}
  </div>
        </div>
      </div>
    </section>
  );
};

export default WokerHome;
