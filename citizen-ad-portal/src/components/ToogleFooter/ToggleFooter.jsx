import React from 'react';
import { Flex, Switch, Typography } from 'antd';
import { FlexContainer, SwitchWrapper } from './ToggleFooter.style';

const { Text } = Typography;

function ToggleFooter() {
  const onAdsPanelToggle = (value) => {
    console.log({ value });
  };

  const onReportToggle = (value) => {
    console.log({ value });
  };

  return (
    <FlexContainer gap={35}>
      <SwitchWrapper>
        <Switch onChange={onAdsPanelToggle} defaultChecked />
        <Text>Bảng QC</Text>
      </SwitchWrapper>

      <SwitchWrapper>
        <Switch onChange={onReportToggle} defaultChecked />
        <Text>Báo cáo vi phạm</Text>
      </SwitchWrapper>
    </FlexContainer>
  );
}

export default ToggleFooter;
