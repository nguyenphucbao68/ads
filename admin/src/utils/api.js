import axios from 'axios'

const API_URL = 'http://localhost:4000/v1/'

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config
    const refreshToken = localStorage.getItem('refreshToken')
    console.log('refreshToken', refreshToken)
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true
      return axios
        .post(API_URL + 'auth/refresh-tokens', {
          refreshToken,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('token', res.data.access.token)
            localStorage.setItem('refreshToken', res.data.refresh.token)

            // return axios(originalRequest);
            return instance(originalRequest)
          }
        })
        .catch((err) => {
          // if status Please authenticate
          if (err.response.status === 401 || err.response.status === 403) {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            window.location.href = '/#/login'
          }
        })
    }

    return Promise.reject(error)
  },
)

export default instance
