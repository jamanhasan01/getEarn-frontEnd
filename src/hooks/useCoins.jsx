import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useCoins = () => {
 let { user, loading, } = useAuth();
  let axiosPrivate = useAxiosPrivate();
  let {data:coins,refetch}=useQuery({
    queryKey:[user?.email,"coins"],
    queryFn:async()=>{
        let res=await axiosPrivate.get(`/users/buyer/${user?.email}`)
        return res.data.user.coins
    }
  })
  return [coins,refetch]
}

export default useCoins