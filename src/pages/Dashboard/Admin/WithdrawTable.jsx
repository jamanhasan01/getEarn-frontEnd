import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { MdDeleteForever } from "react-icons/md";
import { RxCross2, RxCrosshair2 } from "react-icons/rx";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import LoadingPage from "../../../shared/LoadingPage";

const WithdrawTable = ({total_count_refatch}) => {
  let axiosPrivate = useAxiosPrivate();
  let { user } = useAuth();
  let {
    data: withdraw_data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["withdraw_data", user?.email],
    queryFn: async () => {
      let res = await axiosPrivate("/withdraw");

      return res?.data;
    },
  });

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }
  // this funtion for handle approve request

  let handleApproveReq = async (id, email, withdraw_amount) => {
    console.log(id, email, withdraw_amount);

    let res = await axiosPrivate.patch(`/withdraw/${id}`, {
      status: "approved",
      paid_amount: withdraw_amount,
      email: email,
    });
    if (res.statusText == "OK") {
      toast.success("payment paid successfully");
      refetch();
      total_count_refatch()
    }
  };

  return (
    <section className="border border-gray-600 bg-gray-800 rounded-2xl p-5 overflow-x-auto">
    <h2 className="text-2xl mb-5">Withdraw Request</h2>
    <div className="hidden md:block">
      {/* Standard Table for larger screens */}
      <table className="table table-zebra text-center w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Buyer</th>
            <th>Date</th>
            <th>Payable Dollar</th>
            <th>Approve Or Reject</th>
          </tr>
        </thead>
        <tbody>
          {withdraw_data?.map((worker, idx) => (
            <tr key={worker._id}>
              <th>{idx + 1}</th>
              <td className="flex gap-2 items-center">
                <div className="mask mask-squircle h-12 w-12">
                  <img src={worker?.worker_photo} alt="worker" />
                </div>
                <div className="flex flex-col">
                  <span className="text-start font-semibold">{worker?.worker_name}</span>
                  <span className="text-sm text-gray-400">{worker?.worker_email}</span>
                </div>
              </td>
              <td>{worker?.date}</td>
              <td>{worker?.withdraw_amount}$</td>
              <td className="text-2xl flex items-center gap-2 justify-center">
                {worker?.status === "approved" ? (
                  <span className="py-1 px-2 bg-green-400 text-white text-xs font-semibold rounded-2xl">
                    Approved
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      handleApproveReq(
                        worker?._id,
                        worker?.worker_email,
                        worker?.withdraw_amount
                      )
                    }
                  >
                    <IoCheckmarkDoneSharp />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
    {/* Mobile View: Card Format */}
    <div className="md:hidden">
      {withdraw_data?.map((worker, idx) => (
        <div key={worker._id} className="bg-gray-700 p-4 rounded-lg mb-4 shadow-md w-full">
          <div className="flex items-center gap-3">
            <div className="mask mask-squircle h-12 w-12">
              <img src={worker?.worker_photo} alt="worker" />
            </div>
            <div>
              <p className="font-semibold">{worker?.worker_name}</p>
              <p className="text-sm text-gray-400">{worker?.worker_email}</p>
            </div>
          </div>
          <div className="mt-2">
            <p><span className="font-semibold">Date:</span> {worker?.date}</p>
            <p><span className="font-semibold">Amount:</span> {worker?.withdraw_amount}$</p>
          </div>
          <div className="mt-3">
            {worker?.status === "approved" ? (
              <span className="py-1 px-2 bg-green-400 text-white text-xs font-semibold rounded-2xl">
                Approved
              </span>
            ) : (
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-md text-sm"
                onClick={() =>
                  handleApproveReq(
                    worker?._id,
                    worker?.worker_email,
                    worker?.withdraw_amount
                  )
                }
              >
                Approve
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
  
  );
};

export default WithdrawTable;
