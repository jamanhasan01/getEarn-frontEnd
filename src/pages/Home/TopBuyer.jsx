import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingPage from "../../shared/LoadingPage";
import Title from "../../components/Title";
import useAuth from "../../hooks/useAuth";

import default_avatar from "../../assets/default_avatar.jpg";
import { FaCoins } from "react-icons/fa6";
const TopBuyer = () => {
  let { user } = useAuth();
  let axiosPublic = useAxiosPublic();
  const { data: top_buyers = [], isLoading } = useQuery({
    queryKey: [user?.email, "top_buyers"],
    queryFn: async () => {
      let res = await axiosPublic.get("/top_buyers");
      return res?.data || []; // Ensure it always returns an array
    },
  });

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }
  return (
    <section className="bg-white/95 dark:bg-gray-800 ">
      <div className="container mx-auto px-4">
        <Title
          title={"Top Buyers"}
          subtitle={
            "Our Top buyerss are ranked based on coine. These skilled professionals have shown dedication, efficiency, and consistency in delivering high-quality work."
          }
        ></Title>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {Array.isArray(top_buyers)
            ? top_buyers?.map((buyers) => (
                <div
                  className="flex flex-col gap-2  justify-center items-center border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  key={buyers?._id}
                >
                  <img
                    className="w-1/2 rounded-full border-4 border-orange-400 dark:border-orange-600"
                    src={
                      buyers?.photo ||
                      "https://i1.sndcdn.com/avatars-000425111658-czo6de-t500x500.jpg"
                    }
                    alt={buyers?.name || "buyers"}
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = default_avatar; // Replace with your default image URL
                    }}
                  />
                  <h6 className="text-sm font-semibold">{buyers.name}</h6>
                  <h4 className="text-2xl font-semibold text-orange-500 dark:text-orange-400 flex gap-2  items-center">
                    {buyers?.coins}
                    <FaCoins className="" />
                  </h4>
                </div>
              ))
            : []}
        </div>
      </div>
    </section>
  );
};

export default TopBuyer;
