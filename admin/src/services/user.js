import api from '../utils/api'

const getAll = () => {
  return api.get('vhtt/users').then((res) => {
    return res.data
  })
}

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

const assignUserRoleAndLocation = (id, data) => {
  return api.put(`vhtt/users/${id}`, data).then((res) => {
    return res.data
  })
}

export { getAll, getProfile, updateProfile, createUser, assignUserRoleAndLocation }
