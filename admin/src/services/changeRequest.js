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

export { create }
