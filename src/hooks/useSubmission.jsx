import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic"


const useSubmission = () => {
    let axiosPublic=useAxiosPublic()
 let {data:submission_data}=useQuery({
    queryKey:['submission_data'],
    queryFn:async()=>{
        let res=await axiosPublic.get('/submission_task')
        return res.data
    }
 })
 return [submission_data]
}

export default useSubmission