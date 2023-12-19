import api from '../utils/api'
const login = (email, password) => {
  return api.post('/auth/signin', { email, password }).then((res) => {
    if (res.data.access) {
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

const sendEmailOTP = (email) => {
  return api.post('/auth/send-verification-email', { email }).then((res) => {
    return res.data
  })
}

const verifyEmail = (email, otp) => {
  return api.post('/auth/verify-email', { email, otp }).then((res) => {
    return res.data
  })
}

const resetPasswordEmail = (email, newPassword, rePassword) => {
  return api
    .post('/auth/reset-password-email', {
      email,
      newPassword,
      rePassword,
    })
    .then((res) => {
      return res.data
    })
}

export { login, changePassword, sendEmailOTP, resetPasswordEmail, verifyEmail }
