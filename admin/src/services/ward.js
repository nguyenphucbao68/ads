import api from '../utils/api'

const getAll = () => {
  return api.get('vhtt/wards').then((res) => {
    return res.data
  })
}

const getById = (id) => {
  return api.get(`vhtt/wards/${id}`).then((res) => {
    return res.data
  })
}

const create = (data) => {
  return api.post('vhtt/wards', data).then((res) => {
    return res.data
  })
}

const update = (id, data) => {
  return api.put(`vhtt/wards/${id}`, data).then((res) => {
    return res.data
  })
}

const deleteById = (id) => {
  return api.delete(`vhtt/wards/${id}`).then((res) => {
    return res.data
  })
}

export { getAll, getById, create, update, deleteById }
