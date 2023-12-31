import api from '../utils/api'

const getAll = (id, role) => {
  if (role === 2) {
    return api
      .get('vhtt/ads-panels', {
        params: {
          ward_id: id,
        },
      })
      .then((res) => {
        return res.data
      })
  } else if (role === 1) {
    return api
      .get('vhtt/ads-panels', {
        params: {
          district_id: id,
        },
      })
      .then((res) => {
        return res.data
      })
  } else {
    return api.get('vhtt/ads-panels').then((res) => {
      return res.data
    })
  }
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
