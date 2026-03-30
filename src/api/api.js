import axios from "axios"
import useAuthStore from "../store/authStore"
import useUIStore from "../store/uiStore"

const BASE_URL = import.meta.env.VITE_BACKEND_URL

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

let isRefreshing = false
let refreshSubscribers = []

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb)
}

const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token))
}

API.interceptors.request.use((config) => {

  const token = useAuthStore.getState().accessToken
  const { startLoading } = useUIStore.getState()

  startLoading() // 🔥 START LOADER

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

API.interceptors.response.use(
  (res) => {
    useUIStore.getState().stopLoading() // 🔥 STOP LOADER
    return res
  },
  async (error) => {

    useUIStore.getState().stopLoading()

    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(API(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {

        const refreshResponse = await axios.post(
          "http://localhost:8080/api/v1/auth/refresh",
          {},
          { withCredentials: true }
        )

        const newAccessToken = refreshResponse.data.accessToken

        useAuthStore.getState().setAccessToken(newAccessToken)

        onRefreshed(newAccessToken)
        refreshSubscribers = []

        return API(originalRequest)

      } catch (err) {

        refreshSubscribers = []
        isRefreshing = false

        await useAuthStore.getState().logout()

        window.location.href = "/login/admin"

        return Promise.reject(err)

      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default API