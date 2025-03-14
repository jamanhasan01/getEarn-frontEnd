import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPlayer from "react-player";
import TaskSubmitModel from "../modal/TaskSubmitModel";
import useAuth from "../hooks/useAuth";
import LoadingPage from "../shared/LoadingPage";
import ErrorPage from "../shared/ErrorPage";

const VedioPlayer = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const [watchedTime, setWatchedTime] = useState(0);
  const [isEligible, setIsEligible] = useState(false);
  const [showTaskSubmit, setShowTaskSubmit] = useState(false);
  const playerRef = useRef(null);

  // Fetch video URL
  const {
    data: task,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const res = await axiosPublic(`/task/${id}`);
      return res.data || null;
    },
  });

 
  

  const isPlayable = ReactPlayer.canPlay(task?.task_url);

  // Function to check watched time
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
    
        
        const currentTime = playerRef.current.getCurrentTime();
        setWatchedTime(currentTime);

        if (currentTime >= 10) {
          setIsEligible(true);
          clearInterval(interval); // Stop checking after 10s
        }
      }
    }, 1000); // Check every 1 second

    return () => clearInterval(interval); // Cleanup when component unmounts
  }, []);

  if (loading || isLoading) {
    return <LoadingPage />;
  }
  if (isError) {
    return <ErrorPage />;
  }

  return (
    <section className="bg-black/60">
      <div className="container flex justify-center">
        <div className="flex flex-col border border-gray-700 rounded-2xl bg-gray-800 p-3 w-full md:w-[600px] h-auto">
          {isPlayable ?
            <ReactPlayer
              ref={playerRef}
              url={task?.task_url}
              width="100%"
              height="340px"
              volume={1}
            />
          :
            <p className="text-gray-500">❌ No valid video available.</p>
          }

          <div>
            <p className="mt-2 text-gray-700">
              Watched: {Math.floor(watchedTime)} seconds
            </p>

            {isEligible ? (
              <p className="text-green-500 mt-2">
                ✅ You have watched at least 10 seconds!
              </p>
            ) : (
              <p className="text-red-500 mt-2">
                ❌ Please watch at least 10 seconds.
              </p>
            )}
          </div>

          <button
            disabled={!isEligible}
            onClick={() => setShowTaskSubmit(true)}
            className="button disabled:opacity-15 disabled:cursor-not-allowed"
          >
            Submit Task
          </button>
        </div>
      </div>

      {showTaskSubmit && (
        <TaskSubmitModel
          showTaskSubmit={showTaskSubmit}
          setShowTaskSubmit={setShowTaskSubmit}
          task={task}
          refetch={refetch}
        />
      )}
    </section>
  );
};

export default VedioPlayer;
