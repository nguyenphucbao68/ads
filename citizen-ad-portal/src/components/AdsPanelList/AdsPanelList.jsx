import React, { useEffect, useState } from 'react';
import AdsPanel from '../AdsPanel/AdsPanel';
import { Container } from './AdsPanelList.style';
import { Flex, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import AdsPanelDetail from '../AdsPanelDetail/AdsPanelDetail';
import axios from 'axios';

const { Title } = Typography;

function AdsPanelList(props) {
  return (
    <Flex>
      <Container isVisible={props.isVisible}>
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
    </Flex>
  );
}

export default React.memo(AdsPanelList);
