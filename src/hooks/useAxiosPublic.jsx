import axios from "axios"

let axiosPublic=axios.create({
    baseURL:'http://localhost:9000'
})
const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic