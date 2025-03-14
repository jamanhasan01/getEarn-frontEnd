import React from "react";
import useTasks from "../hooks/useTasks";
import moment from "moment";
import TaskCard from "./TaskCard";
import LoadingPage from "../shared/LoadingPage";

const TaskCards = () => {
  let [tasks,refetch,isLoading] = useTasks();
  const filteredTasks = tasks?.filter((task) => {
    return moment(tasks?.completion_date).isSameOrAfter(moment(), "day");
  });
  if (isLoading) {
    <LoadingPage></LoadingPage>
  }

  
  return (
    <section className=" p-3 md:p-5 ">
      <h2 className="text-3xl font-semibold pb-8 text-center">Task List</h2>
      <div className="">
        <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-5 lg:grid-cols-3">
          {filteredTasks?.map((task) => (
            <TaskCard key={task?._id} task={task} refetch={refetch}loading={isLoading}></TaskCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TaskCards;
