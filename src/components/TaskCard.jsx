import { useState } from "react";
import TaskDetailsModel from "../modal/TaskDetailsModel";

const TaskCard = ({ task }) => {
  const [showTaskModel, setshowTaskModel] = useState(false);
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

  let handleShowTask = () => {
    setshowTaskModel(true);
  };

  return (
    <div className="border p-4 rounded-2xl flex flex-col gap-2">
      <img
        className="w-full h-[200px] object-cover rounded-2xl"
        src={image}
        alt=""
      />
      <h3 className="text-2xl font-semibold">{task_title}</h3>
      <div className="flex justify-between items-center font-semibold text-xl">
        <h4>Coine : {payable_amount}</h4>
        <h4>{completion_date}</h4>
      </div>

      <h3 className="text-xl">Available : {required_workers}</h3>
      <div className="flex justify-between">
        <button onClick={handleShowTask} className="button bg">
          View Task
        </button>
        <button className="button">Submit</button>
      </div>
      <TaskDetailsModel
        showTaskModel={showTaskModel}
        setshowTaskModel={setshowTaskModel}
        task={task}
      ></TaskDetailsModel>
    </div>
  );
};

export default TaskCard;
