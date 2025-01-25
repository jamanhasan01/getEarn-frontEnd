import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import LoadingPage from "../../../shared/LoadingPage";

const MyTasks = () => {
  let { user} = useAuth();
  let axiosPrivate = useAxiosPrivate();


// react query for get data
  let { data: tasks ,isLoading} = useQuery({
    queryKey: [user?.email,'tasks'],
    queryFn: async () => {
      let res = await axiosPrivate(`/tasks/${user?.email}`);
      
      return res.data;
    },
  });
console.log(tasks);
if (isLoading) {
  return <LoadingPage></LoadingPage>
}
let handleUpdateTask=()=>{

}
let handleDeleteTask=()=>{

}

  return (
    <section>
      <div className="">
        <h1> ManageUsers ({tasks?.length})</h1>

        <div>
          <div className="overflow-x-auto">
            <table className="table table-zebra text-center">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Photo</th>
                  <th>Title</th>
                  <th>Last Date</th>
                  <th>Submission Info</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {tasks.map((task, idx) => (
                  <tr key={task._id}>
                    <th>{idx + 1}</th>
                    <td className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={task?.image} />
                      </div>
                    </td>

                    <td>{task?.task_title}</td>

                    <td>{task?.completion_date}</td>
                    <td>{task?.submission_info}</td>

                    <td className="text-2xl space-x-2">
                      <button onClick={() => handleDeleteTask(task._id)}>
                           <MdDeleteForever />
                         </button>
                         <button onClick={() => handleUpdateTask(task._id)}>
                           <RxUpdate />
                         </button>
                    </td>
                  </tr>
                 
                  
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyTasks;
