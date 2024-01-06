import React from 'react'
import PropTypes from 'prop-types'

import AdsPanel from '../AdsPanel/AdsPanel'
import { Container } from './AdsPanelList.style'
import { Flex, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import useWindowDimensions from 'src/views/admin/statistics/useWiindowDimensions'

const { Title } = Typography

function AdsPanelList(props) {
  const { height } = useWindowDimensions()
  const inferHeight = () => {
    if (height < window.screen.availHeight - 50) return '550px'
    else return '100%'
  }
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
              width: '400px',
              height: inferHeight(),
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
