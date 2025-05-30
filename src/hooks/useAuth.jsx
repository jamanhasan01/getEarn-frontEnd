import { useContext } from "react"
import { authContext } from "../provider/AuthProvider"


const useAuth = () => {
  return useContext(authContext)
}

export default useAuth