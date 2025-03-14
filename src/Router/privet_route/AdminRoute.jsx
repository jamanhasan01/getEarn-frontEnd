import { Navigate, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import LoadingPage from "../../shared/LoadingPage";
import useAuth from "../../hooks/useAuth";

const AdminRoute = () => {
  let [isAdmin, adminLoading] = useAdmin();
  let { logout } = useAuth();
  if (adminLoading) {
    return <LoadingPage></LoadingPage>;
  }
  if (!isAdmin) {
    logout();
    return <Navigate to={"/signin"}></Navigate>;
  }
  return isAdmin ? <Outlet /> : <Navigate to={"/signin"}></Navigate>;
};

export default AdminRoute;
