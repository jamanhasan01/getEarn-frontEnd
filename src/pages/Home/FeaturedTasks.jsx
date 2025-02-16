
import TaskCard from "../../components/TaskCard"
import useTasks from "../../hooks/useTasks"

const FeaturedTasks = () => {
 let [tasks]=useTasks()

  return (
    <section>
        <div className="container">
       
            <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-5 lg:grid-cols-3">
              {
                tasks?.map(task=>(
                  <TaskCard key={task?._id} task={task}></TaskCard>
                ))
              }
            </div>
        </div>
    </section>
  )
}

export default FeaturedTasks