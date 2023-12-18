import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    console.log('token', token)
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
    if (
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
            console.log('res', res.data)
            localStorage.setItem('token', res.data.access.token)
            localStorage.setItem('refreshToken', res.data.refresh.token)

            console.log('Access token refreshed!')
            // return axios(originalRequest);
            return instance(originalRequest)
          }
        })
    }
    return Promise.reject(error)
  },
)

export default instance
