import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import LoadingPage from "../../shared/LoadingPage";
import { BsCoin } from "react-icons/bs";
import Title from "../../components/Title";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import default_avatar from '../../assets/default_avatar.jpg'
import { FaCoins } from "react-icons/fa6";

const TopWorker = () => {
  let { user } = useAuth();
  let axiosPublic = useAxiosPublic();
  const { data: top_worker = [], isLoading } = useQuery({
    queryKey: [user?.email,'top_workers'],
    queryFn: async () => {
      let res = await axiosPublic.get("/top_workers");
      return res?.data || []; // Ensure it always returns an array
    },
  });

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <section className="bg-orange-50 dark:bg-gray-900 ">
      <div className="container mx-auto px-4">
        <Title
          title={"Top Workers"}
          subtitle={
            "Our Top Workers are ranked based on the total coins earned by completing tasks. These skilled professionals have shown dedication, efficiency, and consistency in delivering high-quality work."
          }
        ></Title>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {Array.isArray(top_worker)
            ? top_worker?.map((worker) => (
                <div
                  className="flex flex-col gap-3 justify-center items-center border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  key={worker?._id}
                >
                  <img
                    className="w-1/2 rounded-full border-4 border-orange-400 dark:border-orange-600"
                    src={
                      worker?.photo ||
                      "https://i1.sndcdn.com/avatars-000425111658-czo6de-t500x500.jpg"
                    }
                    alt={worker?.name || "Worker"}
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = default_avatar // Replace with your default image URL
                    }}
                  />
                  <h6 className="text-sm font-semibold">{worker.name}</h6>
                  <h4 className="text-2xl font-semibold text-orange-500 flex gap-2  items-center">
                    {worker?.coins} 
                        <FaCoins  className="" />
                  </h4>
                </div>
              ))
            : []}
        </div>
      </div>
    </section>
  );
};

export default TopWorker;