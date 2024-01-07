import { Button, Flex } from 'antd';
import styled from 'styled-components';

export const FlexContainer = styled(Flex)`
  position: absolute;
  top: 35%;
  right: 10px;
  width: 400px;
  z-index: 1;
`;

export const RightPanelToggle = styled(Button)`
  align-self: flex-end;
`;
