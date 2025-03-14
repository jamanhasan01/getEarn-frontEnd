import { Navigate, Outlet } from "react-router-dom";
import useWorker from "../../hooks/useWorker";
import useAuth from "../../hooks/useAuth";
import LoadingPage from "../../shared/LoadingPage";

const WorkerRoute = () => {
  const { logout, loading } = useAuth();
  const [isWorker, workerLoading] = useWorker();
  if (workerLoading) {
    return <LoadingPage></LoadingPage>;
  }
  if (!isWorker?.worker) {
    logout();
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default WorkerRoute;
