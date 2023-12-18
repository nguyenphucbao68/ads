import api from '../utils/api'
const getProfile = () => {
  return api.get('/user').then((res) => {
    return res.data
  })
}

export { getProfile }
