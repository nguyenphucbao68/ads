import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { FlexContainer, RightPanelToggle } from './AdsPanelLocationInfo.style'
import LocationInfo from '../LocationInfo/LocationInfo'
import AdsPanelInfo from '../AdsPanelInfo/AdsPanelInfo'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

function AdsPanelLocationInfo({ locationDetail, adsPanelDetail }) {
  const [visibleInfomation, setVisibleInformation] = useState(true)

  return (
    <FlexContainer vertical gap={5}>
      <RightPanelToggle
        icon={visibleInfomation ? <EyeOutlined /> : <EyeInvisibleOutlined />}
        shape="circle"
        onClick={() => setVisibleInformation(!visibleInfomation)}
      />
      {visibleInfomation && (
        <React.Fragment>
          <AdsPanelInfo adsPannelInfo={adsPanelDetail} />
          <LocationInfo locationDetail={locationDetail} />
        </React.Fragment>
      )}
    </FlexContainer>
  )
}

AdsPanelLocationInfo.propTypes = {
  locationDetail: PropTypes.object,
  adsPanelDetail: PropTypes.object,
}

export default AdsPanelLocationInfo
