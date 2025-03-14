import { useState } from "react";
import TaskDetailsModel from "../modal/TaskDetailsModel";
import TaskSubmitModel from "../modal/TaskSubmitModel";
import useTasks from "../hooks/useTasks";

const TaskCard = ({ task,refetch}) => {
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
<>
        
{required_workers>=1 &&
   
   <div className="border border-gray-500 p-3 rounded-2xl flex flex-col gap-2 bg-black/30">
     <img
       className="w-full h-[200px] object-cover rounded-2xl"
       src={image}
       alt=""
     />
     <h3 className="text-2xl font-semibold">{task_title}</h3>
     <div className="flex justify-between items-center font-semibold text-base">
       <h4 className="">Coine : {payable_amount}</h4>
       <h4 className="">{completion_date}</h4>
     </div>

     <h3 className="text-base font-medium">Available : {required_workers}</h3>
     <div className="flex justify-between">
       <button onClick={handleShowTask} className="button bg w-full">
         View Task
       </button>
      
     </div>
     <TaskDetailsModel
       showTaskModel={showTaskModel}
       setshowTaskModel={setshowTaskModel}
       task={task}
     ></TaskDetailsModel>
   
   </div>
   }
</>
   
  );
};

export default TaskCard;
