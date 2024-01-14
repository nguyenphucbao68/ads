import React, { useEffect, useRef, useState } from 'react';
import AdsPanel from '../AdsPanel/AdsPanel';
import { Container, SideBarToggle } from './AdsPanelList.style';
import {  Flex, Typography } from 'antd';
import {
  ExclamationCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import AdsPanelDetail from '../AdsPanelDetail/AdsPanelDetail';
import axios from 'axios';
import { useAdsPanelDetail } from '../../contexts/AdsPanelDetailProvider';

const { Title } = Typography;

function AdsPanelList(props) {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const { adsPanelDetail } = useAdsPanelDetail();

  const getToggleLeftButton = () => {
    if (adsPanelDetail) {
      return '600px';
    }
    if (sideBarOpen) {
      return '430px';
    }

    return '10px';
  };

  return (
    <div>
      <Container
        isVisible={props.isVisible}
        style={{ left: sideBarOpen ? '0px' : '-400px' }}
      >
        {props.items.length > 0 ? (
          props.items.map((item, idx) => (
            <AdsPanel adsPanelItem={item} key={idx} />
          ))
        ) : (
          <Flex
            style={{
              width: 400,
              height: '100vh',
            }}
            align='center'
            justify='center'
            vertical
          >
            <ExclamationCircleOutlined style={{ fontSize: 48 }} />
            <Title level={3}>KHÔNG CÓ THÔNG TIN</Title>
          </Flex>
        )}
      </Container>
      <SideBarToggle
        icon={sideBarOpen ? <LeftOutlined /> : <RightOutlined />}
        shape='circle'
        onClick={() => setSideBarOpen(!sideBarOpen)}
        style={{
          left: getToggleLeftButton(),
        }}
      />
    </div>
  );
}

export default React.memo(AdsPanelList);
