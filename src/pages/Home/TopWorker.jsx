import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import LoadingPage from "../../shared/LoadingPage";
import { BsCoin } from "react-icons/bs";
import Title from "../../components/Title";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const TopWorker = () => {
  let { user } = useAuth();
  let axiosPublic = useAxiosPublic();
  const { data: top_worker = [] ,isLoading} = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      let res = await axiosPublic.get("/top_workers");
      return res?.data || []; // Ensure it always returns an array
    },
  });
  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <section>
      <div className="container">
        <Title
          title={"Top Workers"}
          subtitle={
            "Our Top Workers are ranked based on the total coins earned by completing tasks. These skilled professionals have shown dedication, efficiency, and consistency in delivering high-quality work."
          }
        ></Title>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.isArray(top_worker) ?(top_worker?.map((worker) => (
            <div
              className="flex flex-col gap-3 justify-center items-center border bg-gray-500 bg-opacity-20 border-gray-500 p-5 rounded-xl"
              key={worker?._id}
            >
              <img className="w-1/2 rounded-full" src={worker?.photo||"https://i1.sndcdn.com/avatars-000425111658-czo6de-t500x500.jpg"} alt="" />
              <h4 className="text-2xl font-semibold text-[#FFD700] flex gap-2 items-center">
                {worker?.coins} Coins
              </h4>
            </div>
          ))) :[]}
          
        </div>
      </div>
    </section>
  );
};

export default TopWorker;
