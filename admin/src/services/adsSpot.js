import api from '../utils/api'

const getAll = () => {
  return api.get('vhtt/ads-spots').then((res) => {
    return res.data
  })
}

const getById = (id) => {
  return api.get(`vhtt/ads-spots/${id}`).then((res) => {
    return res.data
  })
}

const create = (data) => {
  return api.post('vhtt/ads-spots', data).then((res) => {
    return res.data
  })
}

const update = (id, data) => {
  return api.put(`vhtt/ads-spots/${id}`, data).then((res) => {
    return res.data
  })
}

const deleteById = (id) => {
  return api.delete(`vhtt/ads-spots/${id}`).then((res) => {
    return res.data
  })
}

export { getAll, getById, create, update, deleteById }
