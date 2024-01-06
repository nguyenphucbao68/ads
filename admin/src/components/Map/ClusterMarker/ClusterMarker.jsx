import React from 'react'
import PropTypes from 'prop-types'
import { Marker } from '@goongmaps/goong-map-react'

import { StyledCircle } from './ClusterMarker.style'

const getBackgroundColor = (pointCount) => {
  if (pointCount < 10) return '#51bbd6'
  else if (pointCount < 20) return '#f1f075'
  return '#f28cb1'
}

function ClusterMarker({ id, latitude, longitude, pointCount, pointLength, onZoom }) {
  return (
    <Marker latitude={latitude} longitude={longitude}>
      <StyledCircle
        onClick={() => onZoom(id, latitude, longitude)}
        style={{
          width: `${25 + (pointCount / pointLength) * 30}px`,
          height: `${25 + (pointCount / pointLength) * 30}px`,
          backgroundColor: `${getBackgroundColor(pointCount)}`,
        }}
      >
        {pointCount}
      </StyledCircle>
    </Marker>
  )
}

ClusterMarker.propTypes = {
  id: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  pointCount: PropTypes.number,
  pointLength: PropTypes.number,
  onZoom: PropTypes.func,
}

export default React.memo(ClusterMarker)
