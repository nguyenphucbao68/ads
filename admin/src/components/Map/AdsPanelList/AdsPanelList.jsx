import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AdsPanel from '../AdsPanel/AdsPanel'
import { Container, SideBarToggle } from './AdsPanelList.style'
import { Flex, Typography } from 'antd'
import { ExclamationCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import useWindowDimensions from 'src/views/admin/statistics/useWiindowDimensions'

const { Title } = Typography

function AdsPanelList(props) {
  const [sideBarOpen, setSideBarOpen] = useState(true)
  const { adsPanelDetail, onShowPanelDetail } = props
  const getToggleLeftButton = () => {
    if (adsPanelDetail) {
      return '600px'
    }
    if (sideBarOpen) {
      return '430px'
    }

    return '10px'
  }
  const { height } = useWindowDimensions()
  const inferHeight = () => {
    if (height < window.screen.availHeight - 50) return '550px'
    else return '100%'
  }

  return (
    <div>
      <Container
        isVisible={props.isVisible}
        style={{
          left: sideBarOpen ? '0px' : '-400px',
          paddingTop: 75,
          width: '420px',
        }}
      >
        {props.items.length > 0 ? (
          props.items.map((item, idx) => (
            <AdsPanel adsPanelItem={item} key={idx} onShowPanelDetail={onShowPanelDetail} />
          ))
        ) : (
          <Flex
            style={{
              width: '400px',
              height: inferHeight(),
              paddingBottom: 75,
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
      <SideBarToggle
        icon={sideBarOpen ? <LeftOutlined /> : <RightOutlined />}
        shape="circle"
        onClick={() => setSideBarOpen(!sideBarOpen)}
        style={{
          left: getToggleLeftButton(),
        }}
      />
    </div>
  )
}

AdsPanelList.propTypes = {
  items: PropTypes.array,
  isVisible: PropTypes.object,
  adsPanelDetail: PropTypes.object,
  onShowPanelDetail: PropTypes.func,
}

export default React.memo(AdsPanelList)
