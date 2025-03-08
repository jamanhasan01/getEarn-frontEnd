
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useBuyer = () => {
  let { user, loading } = useAuth();
  let axiosPrivate = useAxiosPrivate();

  const { data: isBuyer, isLoading: buyerLoading ,refetch:isBuyerRef} = useQuery({
    queryKey: [user?.email, "isBuyer"],
    enabled: !loading,

    queryFn: async () => {
      const res = await axiosPrivate.get(`/users/buyer/${user?.email}`); 
      
      return res.data;
    },
  });

  
 
  return [isBuyer, buyerLoading,isBuyerRef];
};

export default useBuyer;
