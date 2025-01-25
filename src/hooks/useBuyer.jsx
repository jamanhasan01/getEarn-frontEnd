import React, { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useBuyer = () => {
  let { user, loading } = useAuth();
  let axiosPrivate = useAxiosPrivate();

  const { data: isBuyer, isLoading: buyerLoading } = useQuery({
    queryKey: [user?.email, "isBuyer"],
    enabled: !loading,

    queryFn: async () => {
      const res = await axiosPrivate.get(`/users/buyer/${user.email}`); 
      return res.data;
    },
  });

  console.log(isBuyer);
  
 
  return [isBuyer, buyerLoading];
};

export default useBuyer;
