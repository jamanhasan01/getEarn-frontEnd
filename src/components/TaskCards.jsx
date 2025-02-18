import React from "react";
import useTasks from "../hooks/useTasks";
import moment from "moment";
import TaskCard from "./TaskCard";

const TaskCards = () => {
  let [tasks] = useTasks();
  const filteredTasks = tasks?.filter((task) => {
    return moment(task?.completion_date).isAfter(moment(), "day");
  });
  return (
    <section>
      <div className="container">
        <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-5 lg:grid-cols-3">
          {filteredTasks?.map((task) => (
            <TaskCard key={task?._id} task={task}></TaskCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TaskCards;
