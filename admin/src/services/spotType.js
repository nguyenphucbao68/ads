import api from '../utils/api'

const getAll = () => {
  return api.get('vhtt/spot-types').then((res) => {
    return res.data
  })
}

const getById = (id) => {
  return api.get(`vhtt/spot-types/${id}`).then((res) => {
    return res.data
  })
}

const create = (data) => {
  return api.post('vhtt/spot-types', data).then((res) => {
    return res.data
  })
}

const update = (id, data) => {
  return api.put(`vhtt/spot-types/${id}`, data).then((res) => {
    return res.data
  })
}

const deleteById = (id) => {
  return api.delete(`vhtt/spot-types/${id}`).then((res) => {
    return res.data
  })
}

export { getAll, getById, create, update, deleteById }
