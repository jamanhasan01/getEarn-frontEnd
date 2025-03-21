import axios from "axios"

let axiosPublic=axios.create({
    baseURL:'https://get-earn-back-end.vercel.app'
})
const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic