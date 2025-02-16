import { toast } from "react-toastify";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useBuyer from "../../../hooks/useBuyer";
import useAuth from "../../../hooks/useAuth";
import LoadingPage from "../../../shared/LoadingPage";
import moment from "moment";

const AddTask = () => {
  let axiosPublic = useAxiosPublic();
  let axiosPrivate = useAxiosPrivate();
  let [isBuyer, buyerLoading, refetch] = useBuyer();
  let { user } = useAuth();
  let todayDate=moment()



  if (buyerLoading) {
    return <LoadingPage></LoadingPage>;
  }

  

  

  let handleSubmitTask = async (e) => {
    e.preventDefault();

    let form = new FormData(e.target);
    let task_title = form.get("task_title");
    let required_workers = parseInt(form.get("required_workers"));
    let payable_amount = parseFloat(form.get("payable_amount"));
    let completion_date = form.get("completion_date");
    let submission_info = form.get("submission_info");
    let task_details = form.get("task_details");
    let task_url = form.get("task_url");
    let imageFile = e.target.image.files[0];

    let completionDate = moment(completion_date);
    console.log(completionDate);
    

    if (completionDate.isBefore(todayDate, "day")) {
      toast.error("You have to select a future date");
      return;
    }

    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }
    console.log(imageFile);

    if (required_workers <= 0 || payable_amount <= 0) {
      toast.error("Workers and Payable Amount must be positive numbers.");
      return;
    }

    let imageDbApi = import.meta.env.VITE_IMGDB_API;

    try {
      let imageFormData = new FormData();
      imageFormData.append("image", imageFile);

      let imgUploadRes = await axiosPublic.post(
        `https://api.imgbb.com/1/upload?key=${imageDbApi}`,
        imageFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      let imageUrl = imgUploadRes.data?.data?.url;
      if (!imageUrl) {
        toast.error("Image upload failed");
        return;
      }

      let userCoins = isBuyer?.user?.coins;
      console.log(userCoins);

      let requiredTotal = payable_amount * required_workers;

      if (userCoins < requiredTotal) {
        toast.error("Insufficient coins to create the task");
        return;
      }

      let taskObj = {
        task_title,
        required_workers,
        payable_amount,
        completion_date,
        submission_info,
        task_details,
        task_url,
        image: imageUrl,
        buyer_email: user?.email,
      };

      let totalCoin = userCoins - requiredTotal;

      let res = await axiosPrivate.post("/tasks", taskObj);

      if (res.data.insertedId) {
        // after added data this api minus  coin
        let res = await axiosPrivate.patch(`/users/buyer/${user?.email}`, {
          coins: totalCoin,
        });
        console.log(res);

        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Task has been added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        e.target.reset();
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <div className="hero min-h-screen">
        <div className="card bg-base-100 w-full max-w-lg shadow-2xl">
          <form onSubmit={handleSubmitTask} className="card-body">
            <h2 className="text-2xl text-center font-semibold">Add New Task</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Task Title</span>
                </label>
                <input
                  type="text"
                  name="task_title"
                  placeholder="Task title"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Completion Date</span>
                </label>
                <input
                  type="date"
                  name="completion_date"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Payable Amount</span>
                </label>
                <input
                  type="number"
                  name="payable_amount"
                  placeholder="Amount"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Required Workers</span>
                </label>
                <input
                  type="number"
                  name="required_workers"
                  placeholder="Workers"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Submission Info</span>
                </label>
                <textarea
                  name="submission_info"
                  placeholder="Submission info"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Task Details</span>
                </label>
                <textarea
                  name="task_details"
                  placeholder="Task details"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Image Upload</span>
              </label>
              <input
                type="file"
                name="image"
                className="file-input file-input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Task Url</span>
              </label>
              <input
                type="url"
                name="task_url"
                placeholder="Task Url"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Add Task</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
