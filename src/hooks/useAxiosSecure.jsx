        
  
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import useAuth from './useAuth'
  
  
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})
  
   
const useAxiosSecure = () => {
  const { user, logOut } = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
  
    // request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    ) 
  
    // response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const status = err?.response?.status
  
        if (status === 401 || status === 403) {
          try {
            await logOut()
            navigate('/login')
          } catch (e) {
            console.error(e)
          }
        }
  
        return Promise.reject(err)
      }
    )
  
    // cleanup ALWAYS
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor)
      axiosInstance.interceptors.response.eject(responseInterceptor)
    }
  
  }, [user, logOut, navigate])
  
  return axiosInstance
} 
  
export default useAxiosSecure
  
  
  