import { useEffect } from "react";
import { Link } from "react-router-dom";

// buyer_email,
// completion_date,
// image,
// payable_amount,
// required_workers,
// submission_info,
// task_details,
// task_title,
// _id,

const TaskDetailsModel = ({ showTaskModel, setshowTaskModel, task }) => {
  let {
    buyer_email,
    completion_date,
    image,
    payable_amount,
    required_workers,
    submission_info,
    task_details,
    task_title,
    _id,
  } = task;
  useEffect(() => {
    if (showTaskModel) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling when modal closes
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup when component unmounts
    };
  }, [showTaskModel]);

  return (
    <div>
      {showTaskModel && (
        <div className="fixed left-0 top-0 w-full h-full z-50  bg-black/90">
          <div className="fixed left-[50%] top-[50%] w-3/6 bg-white -translate-x-[50%] -translate-y-[50%] p-3 text-gray-800">
            <div className="flex justify-end">
              <button
                className="text-2xl font-semibold text-right "
                onClick={() => setshowTaskModel(false)}
              >
                X
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <div className="p-2 border rounded-2xl">
                <img
                  className="w-full h-[200px]  rounded-2xl object-cover"
                  src={image}
                  alt=""
                />
              </div>
              <div className="flex justify-between">
                <h3 className="text-2xl font-semibold">Title : {task_title}</h3>
                <h3 className="text-xl font-semibold">
                  Deadline : {completion_date}
                </h3>
              </div>
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold">
                  💰Earn : {payable_amount}
                </h3>
                <h3 className="text-xl font-semibold">
                  Available : {required_workers}
                </h3>
              </div>
              <h4 className="font-semibold">
                ✅ Requirements:{" "}
                <ol className="list-decimal ml-5">
                  <li>- Watch the 30 second video.</li>
                  <li> - {submission_info}</li>
                </ol>
              </h4>
              <p className=" font-semibold">Details : {task_details}</p>
              <Link
                to={`/vedioplayer/${_id}`}
                className="button w-full text-center"
              >
                Watch
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetailsModel;
