import { useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPlayer from "react-player";

const VedioPlayer = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const [watchedTime, setWatchedTime] = useState(0);
  const [isEligible, setIsEligible] = useState(false);

  // Fetch video URL
  const {
    data: task,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const res = await axiosPublic(`/task/${id}`);
      return res.data?.task_url || null;
    },
  });

  // Function to track watched time
  const handleProgress = (progress) => {
    console.log(progress);

    const watchedSeconds = progress.playedSeconds;
    setWatchedTime(watchedSeconds);

    if (watchedSeconds >= 30) {
      setIsEligible(true);
    }
  };

  return (
    <section>
      <div className="container flex justify-center">
        {isLoading && <p className="text-blue-500">Loading video...</p>}
        {isError && <p className="text-red-500">Error loading video.</p>}

        <div className="flex flex-col">
        {task ? (
          <ReactPlayer
            url={task}
            
            width="600px"
            height="340px"
            onProgress={handleProgress} // Tracks video progress
          />
        ) : (
          <p className="text-gray-500">No valid video available.</p>
        )}

        <div>
          <p className="mt-2 text-gray-700">
            Watched: {Math.floor(watchedTime)} seconds
          </p>

          {isEligible ? (
            <p className="text-green-500 mt-2">
              ✅ You have watched at least 30 second!
            </p>
          ) : (
            <p className="text-red-500 mt-2">
              ❌ Please watch at least 30 second.
            </p>
          )}
        </div>
        </div>
      </div>
    </section>
  );
};

export default VedioPlayer;
