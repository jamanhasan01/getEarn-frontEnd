import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useCoins = () => {
 let { user, loading, } = useAuth();
  let axiosPrivate = useAxiosPrivate();
  let {data:coins,refetch:refetchCoins}=useQuery({
    queryKey:[user?.email,"coins"],
    queryFn:async()=>{
        let res=await axiosPrivate.get(`/user/${user?.email}`)
        return res.data.coins
    }
  })
  return [coins,refetchCoins]
}

export default useCoins