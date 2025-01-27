import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import LoadingPage from "../../../shared/LoadingPage";
import { toast } from "react-toastify";

const UpdateTask = () => {
  const { id } = useParams();
  let { loading } = useAuth();
  let axiosPrivate = useAxiosPrivate();
  let navigate = useNavigate();

  let { data: task, isLoading } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      let res = await axiosPrivate(`/task/${id}`);
      return res.data;
    },
  });

  if (isLoading || loading) {
    return <LoadingPage></LoadingPage>;
  }

  //  distracture data
  let { submission_info, task_details, task_title, _id } = task;

  let handleTaskUpdate = async (e) => {
    e.preventDefault();
    let form = new FormData(e.target);
    let task_title = form.get("task_title");
    let task_details = form.get("task_details");
    let submission_info = form.get("submission_info");

    let updateTaskObj = {
      task_title,
      task_details,
      submission_info,
    };
    try {
      let res = await axiosPrivate.patch(`/task/${id}`, updateTaskObj);
      if (res.data.modifiedCount) {
        toast.success("Data has been updated");
        navigate("/dashboard/mytasks");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="hero min-h-screen">
        <div className="card bg-base-100 w-full max-w-lg shadow-2xl">
          <form onSubmit={handleTaskUpdate} className="card-body">
            <h2 className="text-2xl text-center font-semibold">Update Task</h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Task Title</span>
              </label>
              <input
                type="text"
                defaultValue={task_title}
                name="task_title"
                placeholder="Task title"
                className="input input-bordered"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Task Details</span>
                </label>
                <textarea
                  name="task_details"
                  placeholder="Task Details"
                  defaultValue={task_details}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Submission Info</span>
                </label>
                <textarea
                  name="submission_info"
                  placeholder="Submission info"
                  defaultValue={submission_info}
                  className="input input-bordered"
                  required
                />
              </div>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Update Task</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
