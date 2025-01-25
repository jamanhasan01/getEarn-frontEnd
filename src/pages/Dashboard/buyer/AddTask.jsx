import { toast } from "react-toastify";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const AddTask = () => {
  let axiosPublic = useAxiosPublic();

  let handleSubmitTask = async (e) => {
    e.preventDefault();

    let form = new FormData(e.target);
    let task_title = form.get("task_title");
    let required_workers = form.get("required_workers");
    let payable_amount = form.get("payable_amount");
    let completion_date = form.get("completion_date");
    let submission_info = form.get("submission_info");
    let task_details = form.get("task_details");
    let image = form.get("image"); // Get file input

    let imageDbApi = import.meta.env.VITE_IMGDB_API;
    
    if (!image) {
      console.log("No image selected.");
      return;
    }

    try {
      // Upload Image to ImgBB
      let imageFormData = new FormData();
      imageFormData.append("image", image);
  
      let imgUploadRes = await axiosPublic.post(
        `https://api.imgbb.com/1/upload?key=${imageDbApi}`,
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
 
      
      let imageUrl = imgUploadRes.data?.data?.url;
      if (!imageUrl) {
        toast.error("Image upload failed");
        return;
      }

      // Now, submit the task with the uploaded image URL
      let taskObj = {
        task_title,
        required_workers,
        payable_amount,
        completion_date,
        submission_info,
        task_details,
        image: imageUrl, // Use uploaded image URL
      };

      if (imageUrl) {
        let res=await axiosPublic.post('/tasks',taskObj)
        if (res.data.insertedId) {
   
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Data has been added",
            showConfirmButton: false,
            timer: 1500
          });
          e.target.reset();
        }
        
      }
      
      // Send task data to your backend or database (Optional)
      // await axiosPublic.post("/your-api-endpoint", taskObj);

    } catch (error) {
      console.log("Error uploading image:", error.message);
    }
  };

  return (
    <div>
      <div className="hero min-h-screen">
        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
          <form onSubmit={handleSubmitTask} className="card-body">
            <h2 className="text-2xl text-center font-semibold">Add New Task</h2>

            {/* Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Task Title</span>
                </label>
                <input type="text" name="task_title" placeholder="Task title" className="input input-bordered" required />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Completion Date</span>
                </label>
                <input type="date" name="completion_date" className="input input-bordered" required />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Payable Amount</span>
                </label>
                <input type="number" name="payable_amount" placeholder="Amount" className="input input-bordered" required />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Required Workers</span>
                </label>
                <input type="number" name="required_workers" placeholder="Workers" className="input input-bordered" required />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Submission Info</span>
                </label>
                <textarea name="submission_info" placeholder="Submission info" className="input input-bordered" required />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Task Details</span>
                </label>
                <textarea name="task_details" placeholder="Task details" className="input input-bordered" required />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Image Upload</span>
              </label>
              <input type="file" name="image" className="file-input-bordered" required />
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
