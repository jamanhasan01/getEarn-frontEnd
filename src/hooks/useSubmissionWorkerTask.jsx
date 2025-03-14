import React from 'react'
import useAuth from './useAuth'
import { useQuery } from '@tanstack/react-query'
import useAxiosPublic from './useAxiosPublic'
import useAxiosPrivate from './useAxiosPrivate'

const useSubmissionWorkerTask = () => {
    let axiosPrivate=useAxiosPrivate()
    let {user}=useAuth()
  let {data:submission_data,isLoading}=useQuery({
    queryKey:['submission_data',user?.email],
    queryFn:async()=>{
        let res=await axiosPrivate.get(`/submission_task/worker/${user?.email}`)
        return res?.data
    }
  })
  return [submission_data,isLoading]
}

export default useSubmissionWorkerTask