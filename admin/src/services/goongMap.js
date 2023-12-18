import axios from 'axios'

const API_KEY = process.env.REACT_APP_ADS_MANAGEMENT_API_KEY

const forwardGeocoding = ({ lat, long }) => {
  const latlng = `${lat},%20${long}`
  const url = `https://rsapi.goong.io/Geocode?latlng=${latlng}&api_key=${API_KEY}`

  axios
    .get(url)
    .then((res) => {
      if (res.data.status === 'OK') {
        return res.data.results
      } else {
        console.error('Error in forwardGeocoding: ', res.data)
      }
    })
    .catch((err) => {
      console.error('Error in forwardGeocoding: ', err)
    })
}

const reverseGeocoding = ({ address }) => {
  const url = `https://rsapi.goong.io/geocode?address=${encodeURIComponent(
    address,
  )}&api_key=${API_KEY}`

  axios
    .get(url)
    .then((res) => {
      if (res.data.status === 'OK') {
        return res.data.results
      } else {
        console.error('Error in forwardGeocoding: ', res.data)
      }
    })
    .catch((err) => {
      console.error('Error in forwardGeocoding: ', err)
    })
}

export { forwardGeocoding, reverseGeocoding }
