import api from '../utils/api'

const getAll = () => {
  return api.get('officer/reports').then((res) => {
    return res.data
  })
}

// const updateStatus = (id, data) => {
//   return api.post(`officer/reports/${id}`, data).then((res) => {
//     return res.data
//   })
// }

const updateStatus = (id, data) => {
  return api.post(`officer/reports/${id}`, data).then((res) => {
    return res.data
  })
}

export { getAll, updateStatus }
