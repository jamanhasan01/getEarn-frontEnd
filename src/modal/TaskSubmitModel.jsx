import { useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import moment from "moment";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";

const TaskSubmitModel = ({
  showTaskSubmit,
  setShowTaskSubmit,
  task,
  refetch,
}) => {
  let { user } = useAuth();
  let currentTime = moment().format("lll");
  let navigate = useNavigate();

  let axiosPrivate = useAxiosPrivate();

  // object distracture
  let {
    buyer_email,
    buyer_name,
    completion_date,
    image,
    payable_amount,
    required_workers,
    submission_info,
    task_details,
    task_title,
    _id,
  } = task;

  console.log(task);

  // ----------------
  let axiosPublic = useAxiosPublic();
  //   this state for when model over scroll will be hide

  useEffect(() => {
    if (showTaskSubmit) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling when modal closes
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup when component unmounts
    };
  }, [showTaskSubmit]);

  //   this is for update image handle funtion
  const handleSubmitImage = async (e) => {
    e.preventDefault();
    // image update funtion
    let imageFile = e.target.image.files[0];

    let imageDbApi = import.meta.env.VITE_IMGDB_API;

    try {
      let imageFormData = new FormData();
      imageFormData.append("image", imageFile);

      let imgUploadRes = await axiosPublic.post(
        `https://api.imgbb.com/1/upload?key=${imageDbApi}`,
        imageFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      let imageUrl = imgUploadRes?.data?.data?.url;
      if (!imageUrl) {
        toast.error("Image upload failed");
        return;
      }

      console.log("Uploaded Image URL:", imageUrl);

      //   this is post request for update summission data send in database
      let taskSubmissions = {
        taskId: _id,
        buyer_email,
        buyer_name,
        payable_amount,
        worker_email: user?.email,
        worker_name: user?.displayName,
        worker_photo: user?.photoURL,
        required_workers,
        submissionImage: imageUrl,
        taskImage: image,
        task_details,
        completion_date,
        status: "pending",
        task_title,
        submissionTime: currentTime,
      };
      console.log(taskSubmissions);

      let res = await axiosPublic.post("/submission_task", taskSubmissions);
      if (res.data.insertedId) {
        toast.success("Image uploaded successfully!");
        await axiosPrivate.patch(`/task/${_id}/workers?minus_worker=${-1}`);
        refetch();
        setShowTaskSubmit(false);
        navigate("/dashboard/worker/tasklist");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div>
        {showTaskSubmit && (
          <div className="fixed left-0 top-0 w-full h-full z-50  bg-black/90">
            <div className="fixed left-[50%] top-[50%] w-5/6 md:w-4/6 lg:w-3/6 xl:w-3/6 bg-white -translate-x-[50%] -translate-y-[50%] p-3 text-gray-800">
              <div className="flex justify-end">
                <button
                  className="text-2xl font-semibold text-right "
                  onClick={() => setShowTaskSubmit(false)}
                >
                  X
                </button>
              </div>
              {/* Todo : delore input feild for update image */}
              <form onSubmit={handleSubmitImage}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Screenshot Upload for prove
                    </span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="file-input file-input-bordered w-full text-white"
                    required
                  />
                </div>
                <button type="submit" className="btn bg-secondary text-white border-none mt-3 w-full ">
                  Upload
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskSubmitModel;
