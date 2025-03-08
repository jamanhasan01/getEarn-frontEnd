import { useQuery } from "@tanstack/react-query"
import useAuth from "../hooks/useAuth"
import useAxiosPublic from "../hooks/useAxiosPublic"

const SubmissionWorkerTask = () => {
  let axiosPublic=useAxiosPublic()
  let {user}=useAuth()
let {data:submission_data,isLoading}=useQuery({
  queryKey:['submission_data',user?.email],
  queryFn:async()=>{
      let res=await axiosPublic.get(`/submission_task/worker/${user?.email}`)
      return res?.data
  }
})
return [submission_data,isLoading]
}

export default SubmissionWorkerTask