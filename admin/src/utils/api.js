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
    if (error.response && error.response.status === 400) {
      console.error('error.response.data', error.response.data)
      return Promise.resolve(error.response.data)
    }
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
