import api from '../utils/api'
const login = (email, password) => {
  return api.post('/auth/signin', { email, password }).then((res) => {
    if (res.data.access) {
      localStorage.setItem('user', JSON.stringify(res.data.user))
    }
    return res.data
  })
}

export { login }
