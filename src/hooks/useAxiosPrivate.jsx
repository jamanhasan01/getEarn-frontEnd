import axios from "axios"

let axiosPrivate=axios.create({
    baseURL:'http://localhost:3000'
})

const useAxiosPrivate = () => {
  return axiosPrivate
}

export default useAxiosPrivate