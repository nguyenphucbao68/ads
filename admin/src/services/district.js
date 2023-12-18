import api from '../utils/api'

const getAll = () => {
  return api.get('vhtt/districts').then((res) => {
    return res.data
  })
}

const getById = (id) => {
  return api.get(`vhtt/districts/${id}`).then((res) => {
    return res.data
  })
}

const create = (data) => {
  return api.post('vhtt/districts', data).then((res) => {
    return res.data
  })
}

const update = (id, data) => {
  return api
    .put(`vhtt/districts/${id}`, {
      data,
    })
    .then((res) => {
      return res.data
    })
}

const deleteById = (id) => {
  return api.delete(`vhtt/districts/${id}`).then((res) => {
    return res.data
  })
}

export { getAll, getById, create, update, deleteById }
