import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxiosPublic from "./useAxiosPublic"
import useWorker from "./useWorker"


const useFilterTaskForWorker = () => {
  let {isWorker}=useWorker()
    let {user,loading}=useAuth()
    let axiosPublic=useAxiosPublic()
    let {data:tasks}=useQuery({
      queryKey:[user?.email,"tasks"],
      enabled:!loading,
      queryFn:async()=>{
          let res=await axiosPublic("/tasks")
          return res.data
      }
    })
    return [tasks]
}

export default useFilterTaskForWorker