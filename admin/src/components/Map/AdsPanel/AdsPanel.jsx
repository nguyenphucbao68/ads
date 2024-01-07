import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from 'antd'
import { StyledCard } from './AdsPanel.styles'
import { InfoCircleOutlined } from '@ant-design/icons'
// import { useAdsPanelDetail } from '../../contexts/AdsPanelDetailProvider'
import { getFormattedAddress } from 'src/utils/address'

const { Paragraph, Text, Title } = Typography

function AdsPanel({ adsPanelItem, onShowPanelDetail }) {
  // const { onShowPanelDetail } = useAdsPanelDetail()

  const { ads_spot } = adsPanelItem

  return (
    <StyledCard hoverable onClick={(e) => onShowPanelDetail(adsPanelItem)}>
      <Title level={3} style={{ margin: 0 }}>
        {/* Trụ, cụm pano */}
        {adsPanelItem.ads_panel_type.name}
      </Title>
      <Paragraph type="secondary">
        {adsPanelItem.address}
        {getFormattedAddress(ads_spot.address, ads_spot.ward.name, ads_spot.district.name)}
      </Paragraph>
      <Paragraph style={{ margin: 0 }}>
        Kích thước: {+adsPanelItem.width.toFixed(1)}m x {+adsPanelItem.height.toFixed(1)}m
      </Paragraph>
      <Paragraph style={{ margin: 0 }}>
        Số lượng: <Text strong>1 trụ/bảng</Text>
      </Paragraph>
      <Paragraph style={{ margin: 0 }}>
        Hình thức: <Text strong>{ads_spot.ads_type.name}</Text>
      </Paragraph>
      <Paragraph>
        Phân loại: <Text strong>{ads_spot.spot_type.name}</Text>
      </Paragraph>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 32,
        }}
      >
        <InfoCircleOutlined
          twoToneColor="#eb2f96"
          style={{
            fontSize: 20,
            color: '#339dd8',
          }}
          onClick={onShowPanelDetail}
        />
        {/* <Button danger onClick={(e) => e.stopPropagation()} icon={<WarningFilled />}>
          BÁO CÁO VI PHẠM
        </Button> */}
      </div>
    </StyledCard>
  )
}

AdsPanel.propTypes = {
  adsPanelItem: PropTypes.object,
  onShowPanelDetail: PropTypes.func,
}

export default AdsPanel
