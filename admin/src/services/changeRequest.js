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
const update = (id, status) => {
  return api
    .put(`vhtt/edit-requests/${id}`, {
      status,
    })
    .then((res) => {
      return res.data
    })
}

export { create, getAll, update }
