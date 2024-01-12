import React from 'react';
import { Flex, Switch, Typography } from 'antd';
import { FlexContainer, SwitchWrapper } from './ToggleFooter.style';

const { Text } = Typography;

function ToggleFooter({ setAdsSpotVisible, setAdsPanelReportVisible }) {
  return (
    <FlexContainer gap={35}>
      <SwitchWrapper>
        <Switch
          onChange={() => setAdsSpotVisible((prev) => !prev)}
          defaultChecked
        />
        <Text>Bảng QC</Text>
      </SwitchWrapper>

      <SwitchWrapper>
        <Switch
          onChange={() => setAdsPanelReportVisible((prev) => !prev)}
          defaultChecked
        />
        <Text>Báo cáo vi phạm</Text>
      </SwitchWrapper>
    </FlexContainer>
  );
}

export default ToggleFooter;
