import React from 'react'
import PropTypes from 'prop-types'

import AdsPanel from '../AdsPanel/AdsPanel'
import { Container } from './AdsPanelList.style'
import { Flex, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const { Title } = Typography

function AdsPanelList(props) {
  return (
    <Flex>
      <Container
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
        isVisible={props.isVisible}
      >
        {props.items.length > 0 ? (
          props.items.map((item, idx) => (
            <AdsPanel adsPanelItem={item} key={idx} onShowPanelDetail={props.onShowPanelDetail} />
          ))
        ) : (
          <Flex
            style={{
              width: 400,
              height: '100vh',
            }}
            align="center"
            justify="center"
            vertical
          >
            <ExclamationCircleOutlined style={{ fontSize: 48 }} />
            <Title level={3}>KHÔNG CÓ THÔNG TIN</Title>
          </Flex>
        )}
      </Container>
    </Flex>
  )
}

AdsPanelList.propTypes = {
  items: PropTypes.array,
  isVisible: PropTypes.object,
  onShowPanelDetail: PropTypes.func,
}

export default React.memo(AdsPanelList)
