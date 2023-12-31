import React from 'react';
import { FlexContainer } from './AdsPanelLocationInfo.style';
import LocationInfo from '../LocationInfo/LocationInfo';
import AdsPanelInfo from '../AdsPanelInfo/AdsPanelInfo';

function AdsPanelLocationInfo({ locationDetail, adsPanelDetail }) {
  return (
    <FlexContainer vertical gap={5}>
      <AdsPanelInfo adsPanelDetail={adsPanelDetail} />
      <LocationInfo locationDetail={locationDetail} />
    </FlexContainer>
  );
}

export default AdsPanelLocationInfo;
