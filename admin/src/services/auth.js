import api from '../utils/api'
const login = (email, password) => {
  return api.post('/auth/signin', { email, password }).then((res) => {
    if (res.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(res.data.user))
    }
    return res.data
  })
}

const changePassword = (currentPassword, newPassword, rePassword) => {
  return api
    .post('/auth/reset-password', {
      currentPassword,
      newPassword,
      rePassword,
    })
    .then((res) => {
      return res.data
    })
}

export { login, changePassword }
