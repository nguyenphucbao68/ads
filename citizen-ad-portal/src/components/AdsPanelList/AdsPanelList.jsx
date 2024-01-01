import React, { useEffect, useState } from 'react';
import AdsPanel from '../AdsPanel/AdsPanel';
import { Container } from './AdsPanelList.style';
import { Flex, Typography } from 'antd';
import AdsPanelDetail from '../AdsPanelDetail/AdsPanelDetail';
import axios from 'axios';

const { Title } = Typography;

function AdsPanelList(props) {
  return (
    <Flex>
      <Container isVisible={props.isVisible}>
        <div>
          {props.items.length > 0 ? (
            props.items.map((item, idx) => (
              <AdsPanel adsPanelItem={item} key={idx} />
            ))
          ) : (
            <div style={{ width: 400 }}>
              <Title level={2}>KHÔNG CÓ THÔNG TIN</Title>
            </div>
          )}
        </div>
      </Container>
    </Flex>
  );
}

export default React.memo(AdsPanelList);
