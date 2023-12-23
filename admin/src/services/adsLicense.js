import api from '../utils/api'

const getAll = (queryString) => {
  return api.get(`vhtt/ads-licenses${queryString}`).then((res) => {
    return res.data
  })
}

const getById = (id) => {
  return api.get(`vhtt/ads-licenses/${id}`).then((res) => {
    return res.data
  })
}

const update = (id, data) => {
  return api.put(`vhtt/ads-licenses/${id}`, data).then((res) => {
    return res.data
  })
}

const deleteById = (id) => {
  return api.delete(`vhtt/ads-licenses/${id}`).then((res) => {
    return res.data
  })
}

export { getAll, getById, update, deleteById }
