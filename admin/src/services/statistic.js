import api from '../utils/api'

const getReportsStatistics = (queryString) => {
  return api(`vhtt/statistics/reports${queryString}`).then((res) => {
    return res.data
  })
}

export { getReportsStatistics }
