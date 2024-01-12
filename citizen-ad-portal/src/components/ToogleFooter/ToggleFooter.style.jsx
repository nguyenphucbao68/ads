import { Flex } from 'antd';
import styled from 'styled-components';

export const FlexContainer = styled(Flex)`
  position: fixed;
  z-index: 2;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  width: 95%;
  padding: 10px 10px;
  border-radius: 10px;
  opacity: 60%;
  &:hover {
    opacity: 95%;
  }
`;

export const SwitchWrapper = styled(Flex)`
  gap: 5px;
`;
