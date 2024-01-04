import React from 'react'
import PropTypes from 'prop-types'

import { Typography, Flex } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import { StyledCard } from './LocationInfo.style'
const { Title, Paragraph } = Typography

function LocationInfo({ locationDetail }) {
  return (
    <StyledCard>
      <Flex gap={10}>
        <div
          style={{
            paddingTop: 2,
          }}
        >
          <CheckCircleOutlined
            style={{
              fontSize: 16,
            }}
          />
        </div>
        <div>
          <Title level={5} style={{ margin: 0, marginBottom: 10 }}>
            Thông tin địa điểm
          </Title>
          <Paragraph level={5} strong style={{ margin: 0 }}>
            {locationDetail.name}
          </Paragraph>
          <Paragraph level={5}>{locationDetail.address}</Paragraph>
        </div>
      </Flex>
      {/* <Flex justify="flex-end" align="center">
        <Button ghost danger>
          <WarningFilled />
          BÁO CÁO VI PHẠM
        </Button>
      </Flex> */}
    </StyledCard>
  )
}

LocationInfo.propTypes = {
  locationDetail: PropTypes.object,
}

export default LocationInfo
