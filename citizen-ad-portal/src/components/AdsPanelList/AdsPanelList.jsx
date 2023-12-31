import React from 'react';
import AdsPanel from '../AdsPanel/AdsPanel';
import { Container } from './AdsPanelList.style';
import { Flex } from 'antd';
import AdsPanelDetail from '../AdsPanelDetail/AdsPanelDetail';

function AdsPanelList(props) {
  return (
    <Flex>
      <Container isVisible={props.isVisible}>
        <div>
          {props.items.map((item, idx) => (
            <AdsPanel key={idx} />
          ))}
        </div>
      </Container>
    </Flex>
  );
}

export default AdsPanelList;
