import api from '../utils/api'
const getProfile = () => {
  return api.get('/user').then((res) => {
    return res.data
  })
}

const updateProfile = (data) => {
  return api.put('/user', data).then((res) => {
    return res.data
  })
}

const createUser = (data) => {
  return api.post('vhtt/users', data).then((res) => {
    return res.data
  })
}

export { getProfile, updateProfile, createUser }
