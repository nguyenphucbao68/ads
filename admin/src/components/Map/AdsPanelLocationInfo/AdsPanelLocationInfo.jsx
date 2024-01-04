import React from 'react'
import PropTypes from 'prop-types'

import { FlexContainer } from './AdsPanelLocationInfo.style'
import LocationInfo from '../LocationInfo/LocationInfo'
import AdsPanelInfo from '../AdsPanelInfo/AdsPanelInfo'

function AdsPanelLocationInfo({ locationDetail, adsPanelDetail }) {
  return (
    <FlexContainer
      vertical
      gap={5}
      style={{
        position: 'absolute',
        top: '30%',
        right: 50,
        zIndex: 2,
      }}
    >
      <AdsPanelInfo adsPannelInfo={adsPanelDetail} />
      <LocationInfo locationDetail={locationDetail} />
    </FlexContainer>
  )
}

AdsPanelLocationInfo.propTypes = {
  locationDetail: PropTypes.object,
  adsPanelDetail: PropTypes.object,
}

export default AdsPanelLocationInfo
