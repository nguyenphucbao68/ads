import api from '../utils/api'

const getAll = () => {
  return api.get('vhtt/ads-types').then((res) => {
    return res.data
  })
}

const getById = (id) => {
  return api
    .get('vhtt/ads-types/', {
      params: {
        id: parseInt(id, 10),
      },
    })
    .then((res) => {
      return res.data
    })
}

const create = (data) => {
  return api.post('vhtt/ads-types', data).then((res) => {
    return res.data
  })
}

const update = (id, data) => {
  return api
    .put('vhtt/ads-types/', {
      params: {
        id: parseInt(id, 10),
      },
      data,
    })
    .then((res) => {
      return res.data
    })
}

const deleteById = (id) => {
  return api
    .delete('vhtt/ads-types/', {
      params: {
        id: parseInt(id, 10),
      },
    })
    .then((res) => {
      return res.data
    })
}

export { getAll, getById, create, update, deleteById }
