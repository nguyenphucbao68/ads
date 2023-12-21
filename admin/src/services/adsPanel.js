import api from '../utils/api'

const getAll = () => {
  return api.get('vhtt/ads-panels').then((res) => {
    return res.data
  })
}

const getById = (id) => {
  return api.get(`vhtt/ads-panels/${id}`).then((res) => {
    return res.data
  })
}

const create = (data) => {
  return api.post('vhtt/ads-panels', data).then((res) => {
    return res.data
  })
}

const update = (id, data) => {
  return api.put(`vhtt/ads-panels/${id}`, data).then((res) => {
    return res.data
  })
}

const deleteById = (id) => {
  return api.delete(`vhtt/ads-panels/${id}`).then((res) => {
    return res.data
  })
}

export { getAll, getById, create, update, deleteById }
