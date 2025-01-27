import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import LoadingPage from "../../../shared/LoadingPage";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyTasks = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  // Fetch all tasks
  const { data: tasks, isLoading: isLoadingTasks,refetch } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await axiosPrivate(`/tasks/${user?.email}`);
      return res?.data;
    },
    enabled: !!user?.email, // Prevents running query when user is null
  });

  if (isLoadingTasks) {
    return <LoadingPage />;
  }
  const handleDeleteTask = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this task!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });
  
      if (result.isConfirmed) {
        const res = await axiosPrivate.delete(`/task/${id}`);
  
        if (res.data.deletedCount) {
          refetch()
          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success"
          });
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  return (
    <section>
      <div>
        <h1>Manage Users ({tasks?.length})</h1>

        <div className="overflow-x-auto">
          <table className="table table-zebra text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Photo</th>
                <th>Title</th>
                <th>Task Details</th>
                <th>Submission Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task, idx) => (
                <tr key={task._id}>
                  <th>{idx + 1}</th>
                  <td className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={task?.image} alt="Task" />
                    </div>
                  </td>
                  <td>{task?.task_title}</td>
                  <td>{task?.task_details}</td>
                  <td>{task?.submission_info}</td>
                  <td className="text-2xl flex items-center gap-2 justify-center">
                    <button onClick={() => handleDeleteTask(task?._id)}>
                      <MdDeleteForever />
                    </button>
                    <Link to={`/dashboard/updatetask/${task._id}`}>
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
