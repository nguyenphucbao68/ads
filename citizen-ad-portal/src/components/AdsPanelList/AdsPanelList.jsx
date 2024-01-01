import React, { useEffect, useState } from 'react';
import AdsPanel from '../AdsPanel/AdsPanel';
import { Container } from './AdsPanelList.style';
import { Flex } from 'antd';
import AdsPanelDetail from '../AdsPanelDetail/AdsPanelDetail';
import axios from 'axios';

function AdsPanelList(props) {
  const adsSpotInfo = props.popupInfo;
  const [adsPanels, setAdsPanel] = useState([]);

  useEffect(() => {
    const adsPanelsBySpotUri = `${process.env.REACT_APP_ADS_USER_URI}/${adsSpotInfo.id}/ads-panels`;
    console.log({ adsSpotInfo });

    axios({
      method: 'get',
      url: adsPanelsBySpotUri,
      responseType: 'json',
    })
      .then(({ data }) => {
        console.log({ data });
        setAdsPanel(data);
      })
      .catch((e) => {
        console.log(e.toJSON());
      });
  }, []);

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

export default React.memo(AdsPanelList);
