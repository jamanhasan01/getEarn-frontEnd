import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"
import useAuth from "./useAuth"


const useSubmission = () => {
    let axiosPublic=useAxiosPublic()
    let {user}=useAuth()
 let {data:submission_data}=useQuery({
    queryKey:['submission_data',user?.email],
    queryFn:async()=>{
        let res=await axiosPublic.get(`/submission_task/${user?.email}`)
        return res.data
    }
 })
 return [submission_data]
}

export default useSubmission