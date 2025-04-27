import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingPage from "../../shared/LoadingPage";
import Title from "../../components/Title";
import useAuth from "../../hooks/useAuth";
import { motion } from "framer-motion";
import default_avatar from "../../assets/default_avatar.jpg";
import { FaCoins } from "react-icons/fa6";

const TopBuyer = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  // Fetch top buyers data
  const { data: top_buyers = [], isLoading } = useQuery({
    queryKey: [user?.email, "top_buyers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/top_buyers");
      return res?.data || [];
    },
  });

  // Show loading state while data is being fetched
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <section className="bg-white/95 dark:bg-gray-800 py-10">
      <div className="container mx-auto px-4">
        <Title
          title={"Top Buyers"}
          subtitle={
            "Our top buyers are ranked based on coins. These skilled professionals have shown dedication, efficiency, and consistency in delivering high-quality work."
          }
        />

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }} // Animates every time it enters viewport
          transition={{ staggerChildren: 0.2 }} // Stagger effect for better animation
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {top_buyers.map((buyer, index) => (
            <motion.div
              key={buyer._id}
              variants={{
                hidden: { opacity: 0, y: 100 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 12,
                duration: 0.8,
              }}
              className="flex flex-col gap-2 justify-center items-center border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                className="w-1/2 rounded-full border-4 border-orange-400 dark:border-orange-600"
                src={buyer.photo || default_avatar}
                alt={buyer.name || "Buyer"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = default_avatar;
                }}
              />
              <h6 className="text-sm font-semibold">{buyer.name}</h6>
              <h4 className="text-2xl font-semibold text-orange-500 dark:text-orange-400 flex gap-2 items-center">
                {buyer.coins}
                <FaCoins />
              </h4>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TopBuyer;
