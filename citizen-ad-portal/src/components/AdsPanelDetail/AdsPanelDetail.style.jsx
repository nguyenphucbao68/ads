import { Card, Flex, Typography } from 'antd';
import styled from 'styled-components';
import { CloseCircleFilled } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export const StyledCard = styled(Card)`
  text-align: left;
  width: 400px;
  /* height: 75vh; */
  left: 450px;
  z-index: 2;

  .ant-card-body {
    padding: 0px;
    padding-bottom: 10px;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px 8px 0px 0px;
  }
`;

export const StyledFlex = styled(Flex)`
  height: 100vh;
  position: absolute;
`;

export const StyledCloseCircleOutlined = styled(CloseCircleFilled)`
  right: 10px;
  top: 10px;
  font-size: 32px;
  position: absolute;
  color: white;
`;

export const NoMarginTitle = styled(Title)`
  /* margin: 0; */
`;

export const NoMarginParagraph = styled(Paragraph)`
  /* margin: 0; */
`;

export const CardBody = styled(Flex)`
  padding: 0px 10px;
`;
