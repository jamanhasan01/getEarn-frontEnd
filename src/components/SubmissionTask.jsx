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

const SubmissionTask = () => {
  let axiosPrivate = useAxiosPrivate();
  let [coins,refetchCoins]=useCoins()
  let { user } = useAuth();

  // data get form submission db
  let { data: tasks = [] ,refetch:refetchTask} = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      let res = await axiosPrivate("/submission_task");
      return res.data;
    },
  });

  console.log(tasks);

  // this function for approve request

  let handleApproveReq = async (id,email,payable_amount) => {
    let statusObj = { status: "approved" };
    let addCoin={coins:Math.floor(payable_amount)}
    try {
      let res = await axiosPrivate.patch(`/submission_task/${id}`, statusObj);
      
      if (res.data.modifiedCount) {
      let res=  await axiosPrivate.patch(`/users/worker/${email}`,addCoin);
      if (res.data.modifiedCount) {
        toast("Approve Successfull");
        refetchTask();
        refetchCoins()
      }
        
      }
    } catch (error) {
      toast("Approval failed:", error);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra text-center">
          <thead>
            <tr>
              <th>#</th>
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
                  <button className="text-2xl ">
                    <MdViewCarousel></MdViewCarousel>
                  </button>
                </td>
                <td className="text-2xl flex items-center gap-2 justify-center">
                  <button
                    disabled={task?.status =="approved"}
                    className={`${task?.status =="approved"?" text-green-400":""}`}
                    onClick={() => handleApproveReq(task?._id,task?.worker_email,task?.payable_amount)}
                  >
                    <IoCheckmarkDoneSharp />
                  </button>
                  <button className={`${task?.status =="approved"?" hidden":""}`}>
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionTask;
