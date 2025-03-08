import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import LoadingPage from "../../../shared/LoadingPage";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useCoins from "../../../hooks/useCoins";

const MyTasks = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  let [coins, refetchCoins] = useCoins();

  const { data: tasks, isLoading: isLoadingTasks, refetch: taskRefetch } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await axiosPrivate(`/tasks/${user?.email}`);
      return res?.data;
    },
    enabled: !!user?.email,
  });

  if (isLoadingTasks) {
    return <LoadingPage />;
  }

  const handleDeleteTask = async (id, required_workers, payable_amount) => {
    let totalCoin = required_workers * payable_amount;
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this task?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axiosPrivate.delete(`/task/${id}?email=${user.email}&coins=${totalCoin}`);
        if (res.data.deleteResult.deletedCount) {
          refetchCoins();
          taskRefetch();
          Swal.fire({
            title: "Deleted!",
            text: `${res.data.message} ${totalCoin}`,
            icon: "success",
          });
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="bg-gray-700 text-white min-h-screen p-6">
      <div className=" mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Manage Tasks ({tasks?.length})</h1>

        <div className="overflow-x-auto">
          <table className="table w-full text-center text-white">
            <thead>
              <tr className="bg-gray-800">
                <th>#</th>
                <th>Photo</th>
                <th>Title</th>
                <th>Details</th>
                <th>Submission</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task, idx) => (
                <tr key={task._id} className="hover:bg-gray-700">
                  <td>{idx + 1}</td>
                  <td className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={task?.image} alt="Task" className="rounded-lg" />
                    </div>
                  </td>
                  <td>{task?.task_title}</td>
                  <td>{task?.task_details}</td>
                  <td>{task?.submission_info}</td>
                  <td className="text-2xl flex items-center gap-2 justify-center">
                    <button
                      onClick={() => handleDeleteTask(task?._id, task?.payable_amount, task?.required_workers)}
                      className="text-red-500 hover:text-red-700 transition duration-200"
                    >
                      <MdDeleteForever />
                    </button>
                    <Link to={`/dashboard/updatetask/${task._id}`} className="text-blue-400 hover:text-blue-600 transition duration-200">
                      <RxUpdate />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MyTasks;