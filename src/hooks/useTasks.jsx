import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxiosPublic from "./useAxiosPublic"
import { data } from "react-router-dom"

const useTasks = () => {
  let {user,loading}=useAuth()
  let axiosPublic=useAxiosPublic()
  let {data:tasks,refetch,isLoading}=useQuery({
    queryKey:[user?.email,"tasks"],
    enabled:!loading,
    queryFn:async()=>{
        let res=await axiosPublic("/tasks")
        return res.data
    }
  })
  return [tasks,refetch,isLoading]
  
}

export default useTasks