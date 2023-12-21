import React from 'react';
import AdsPanel from '../AdsPanel/AdsPanel';
import { Container } from './AdsPanelList.style';

function AdsPanelList(props) {
  return (
    <Container>
      {props.items.map((item, idx) => (
        <AdsPanel key={idx} />
      ))}
    </Container>
  );
}

export default AdsPanelList;
