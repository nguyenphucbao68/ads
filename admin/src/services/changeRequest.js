import api from '../utils/api'

const create = (data, userId) => {
  return api
    .post(`vhtt/edit-requests`, {
      ...data,
      user_id: userId,
    })
    .then((res) => {
      return res.data
    })
}
const getAll = () => {
  return api.get('vhtt/edit-requests').then((res) => {
    return res.data
  })
}

export { create, getAll }
