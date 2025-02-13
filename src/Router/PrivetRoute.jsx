import useAdmin from "../hooks/useAdmin"
import useBuyer from "../hooks/useBuyer"
import useWorker from "../hooks/useWorker"
import AdminHome from "../pages/Dashboard/Admin/AdminHome"
import BuyerHome from "../pages/Dashboard/buyer/BuyerHome"
import WokerHome from "../pages/Dashboard/worker/WokerHome"

const PrivetRoute = () => {
    let [isAdmin]=useAdmin()
    let [isBuyer]=useBuyer()
    let [isWorker]=useWorker()
    isAdmin && <AdminHome></AdminHome>
    isBuyer && <BuyerHome></BuyerHome>
    isWorker && <WokerHome></WokerHome>
}

export default PrivetRoute