import React from "react";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  let { user, loading } = useAuth();
  let axiosPrivate = useAxiosPrivate();

  const { data: isAdmin, isLoading: adminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,

    queryFn: async () => {
      const res = await axiosPrivate.get(`/users/admin/${user.email}`);

      return res.data?.admin;
    },
  });

  return [isAdmin, adminLoading];
};

export default useAdmin;
