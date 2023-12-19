import React from 'react';
import { Card, Typography } from 'antd';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 0;
    text-align: left;
  }
`;

function PinInfo({ info }) {
  const displayCityName = `${info.city}, ${info.state}`;

  return (
    <StyledCard style={{ width: 300, padding: 0 }} bordered={false}>
      <Title level={5}>Cổ động chính trị</Title>
      <Paragraph>Đất công/Công viên/Hành lang an toàn giao thông</Paragraph>
      <Paragraph>
        Đồng khởi - Nguyễn Du (Sở Văn hoá và Thể thao), Phường Bến Nghé, Quận 1
      </Paragraph>
      <Paragraph strong italic>
        ĐÃ QUY HOẠCH
      </Paragraph>
    </StyledCard>
  );
}

export default React.memo(PinInfo);
