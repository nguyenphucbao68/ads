import React from 'react';
import { Card, Typography } from 'antd';
import styled from 'styled-components';
import { getFormattedAddress } from '../../common/common';
const { Title, Paragraph } = Typography;

const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 0;
    text-align: left;
  }
`;

function PinInfo({ info }) {
  console.log({ info });

  return (
    <StyledCard
      style={{ width: 300, padding: 0, boxShadow: 'none' }}
      bordered={false}
    >
      <Title level={5} style={{ margin: 0 }}>
        {info.ads_type.name}
      </Title>
      <Paragraph style={{ margin: 0 }}>{info.spot_type.name}</Paragraph>
      <Paragraph>
        {getFormattedAddress(info.address, info.ward.name, info.district.name)}
      </Paragraph>
      <Paragraph strong italic>
        {info.is_available ? 'ĐÃ QUY HOẠCH' : 'CHƯA QUY HOẠCH'}
      </Paragraph>
    </StyledCard>
  );
}

export default React.memo(PinInfo);
