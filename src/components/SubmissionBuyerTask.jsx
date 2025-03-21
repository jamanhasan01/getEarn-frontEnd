import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { RxUpdate } from "react-icons/rx";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdViewCarousel } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useState } from "react";
import { toast } from "react-toastify";
import useCoins from "../hooks/useCoins";
import { RxCross2 } from "react-icons/rx";
import LoadingPage from "../shared/LoadingPage";
import useBuyer from "../hooks/useBuyer";
import ViewSubmission from "../modal/ViewSubmission";
const SubmissionBuyerTask = ({ totalPaidCoin, settotalPaidCoin }) => {
  let axiosPrivate = useAxiosPrivate();
  let [coins, refetchCoins] = useCoins();
  let { user } = useAuth();
  const [showModel, setshowModel] = useState(false);
  const [submissionDetails, setsubmissionDetails] = useState({});

  // data get form submission db
  let {
    data: tasks = [],
    refetch: refetchTask,
    isLoading,
  } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      let res = await axiosPrivate(`/submission_task/buyer/${user?.email}`);
      return res?.data;
    },
  });

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  // this function for approve request

  let handleApproveReq = async (id, email, payable_amount) => {
    let statusObj = { status: "approved" };
    let addCoin = { coins: Math.floor(payable_amount) };

    try {
      let res = await axiosPrivate.patch(`/submission_task/${id}`, statusObj);

      if (res.data.modifiedCount) {
        let res = await axiosPrivate.patch(`/users/worker/${email}`, addCoin);
        if (res.data.modifiedCount) {
          let res = await axiosPrivate.patch(
            `/total_paid/users/buyer/${user?.email}?total_coin=${payable_amount}`
          );
     

          settotalPaidCoin(totalPaidCoin + payable_amount);
          toast("Approve Successfull");
          refetchTask();
          refetchCoins();
        }
      }
    } catch (error) {
      toast("Approval failed:", error);
    }
  };

  // this funtion for reject incrage worker

  let handleRejectFunc = async (taskId, id) => {
    let statusObj = { status: "reject" };

    try {
      let res = await axiosPrivate.patch(
        `/task/${taskId}/workers?pluse_worker=${1}`
      );
      if (res.data.modifiedCount) {
        let res = await axiosPrivate.patch(`/submission_task/${id}`, statusObj);
  
        if (res.data.modifiedCount) {
          toast.warning("Reject successfully");
          refetchTask();
          refetchCoins();
        }
      }
    } catch (error) {
      toast(error);
    }
  };

  let handleViewSubmit = (task) => {
    setsubmissionDetails(task);
    setshowModel(true);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="hidden md:block">
          {/* Standard Table for larger screens */}
          <table className="table table-zebra text-center">
            <thead>
              <tr>
                <th>No</th>
                <th>Photo</th>
                <th>Worker Name</th>
                <th>Title</th>
                <th>Payable_Amount</th>
                <th>View Submission</th>
                <th>Approve Or Reject</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task, idx) => (
                <tr key={task._id}>
                  <th>{idx + 1}</th>
                  <td className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={task?.worker_photo} alt="Task" />
                    </div>
                  </td>
                  <td>{task?.worker_name}</td>
                  <td>{task?.task_title}</td>
                  <td>{task?.payable_amount}</td>
                  <td>
                    <button
                      onClick={() => handleViewSubmit(task)}
                      className="text-2xl "
                    >
                      <MdViewCarousel></MdViewCarousel>
                    </button>
                  </td>
                  <td className="text-2xl flex items-center gap-2 justify-center">
                    <button
                      disabled={task?.status == "approved"}
                      className={`${
                        task?.status == "approved"
                          ? " text-green-400"
                          : task?.status == "reject"
                          ? "hidden"
                          : ""
                      }`}
                      onClick={() =>
                        handleApproveReq(
                          task?._id,
                          task?.worker_email,
                          task?.payable_amount
                        )
                      }
                    >
                      <IoCheckmarkDoneSharp />
                    </button>
                    <button
                      onClick={() => handleRejectFunc(task?.taskId, task?._id)}
                      className={`${
                        task?.status == "reject"
                          ? " text-red-600"
                          : task?.status == "approved"
                          ? " hidden"
                          : ""
                      }`}
                    >
                      {task?.status == "reject" ? (
                        <RxCross2 />
                      ) : (
                        <MdDeleteForever />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile View: Card Format */}
        <div className="md:hidden">
          {tasks?.map((task, idx) => (
            <div
              key={task._id}
              className="bg-gray-700 p-4 rounded-lg mb-4 shadow-md w-full"
            >
              <div className="flex items-center gap-3">
                <div className="mask mask-squircle h-12 w-12">
                  <img src={task?.worker_photo} alt="worker" />
                </div>
                <div>
                  <p className="font-semibold">{task?.worker_name}</p>
                  <p className="text-sm text-gray-400">{task?.worker_email}</p>
                </div>
              </div>
              <div className="mt-2">
                <p>
                  <span className="font-semibold">Title:</span>{" "}
                  {task?.task_title}
                </p>
                <p>
                  <span className="font-semibold">Payable Amount:</span>{" "}
                  {task?.payable_amount}$
                </p>
              </div>
              <div className="flex justify-between mt-3">
                <button
                  onClick={() => handleViewSubmit(task)}
                  className="text-blue-400 text-xl"
                >
                  <MdViewCarousel />
                </button>

                {task?.status === "approved" ? (
                  <span className="py-1 px-3 bg-green-400 text-white text-xs font-semibold rounded-full">
                    Approved
                  </span>
                ) : (
                  <div className="flex gap-2">
                    <button
                      disabled={task?.status === "approved"}
                      onClick={() =>
                        handleApproveReq(
                          task?._id,
                          task?.worker_email,
                          task?.payable_amount
                        )
                      }
                      className={`px-4 py-1 rounded-md text-sm ${
                        task?.status === "approved"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectFunc(task?.taskId, task?._id)}
                      className={`px-4 py-1 rounded-md text-sm ${
                        task?.status === "reject"
                          ? "bg-red-500 text-white"
                          : "bg-gray-500"
                      }`}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModel && (
        <ViewSubmission
          showModel={showModel}
          setshowModel={setshowModel}
          submissionDetails={submissionDetails}
          setsubmissionDetails={setsubmissionDetails}
        ></ViewSubmission>
      )}
    </div>
  );
};

export default SubmissionBuyerTask;
