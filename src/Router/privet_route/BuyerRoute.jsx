import { Navigate, Outlet } from "react-router-dom";
import useBuyer from "../../hooks/useBuyer";
import useAuth from "../../hooks/useAuth";
import LoadingPage from "../../shared/LoadingPage";

const BuyerRoute = () => {
  let { logout } = useAuth();
  let [isbuyer, buyerLoading] = useBuyer();
  if (buyerLoading) {
    return <LoadingPage></LoadingPage>;
  }
  if (!isbuyer?.buyer) {
    logout();
    return <Navigate to={"/signin"}></Navigate>;
  }
  return <Outlet />;
};

export default BuyerRoute;
