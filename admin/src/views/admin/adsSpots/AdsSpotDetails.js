import React from 'react'

import { useParams } from 'react-router-dom'

const AdsSpotDetails = () => {
  // get id from url
  // fetch data from api
  // render data

  const { id } = useParams()
  console.log(id)

  return (
    <div>
      AdsSpotDetails
      <div>id: {id}</div>
    </div>
  )
}

export default AdsSpotDetails
