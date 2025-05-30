
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useWorker = () => {
  let { user, loading } = useAuth();
  let axiosPrivate = useAxiosPrivate();

  const { data: isWorker, isLoading: workerLoading ,refetch} = useQuery({
    queryKey: [user?.email, "isWorker"],
    enabled: !loading,

    queryFn: async () => {
      const res = await axiosPrivate.get(`/users/worker/${user?.email}`); 
      
      return res.data;
    },
  });

  
 
  return [isWorker, workerLoading,refetch];
};

export default useWorker;
