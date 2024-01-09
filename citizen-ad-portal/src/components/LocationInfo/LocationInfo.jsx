import { Card, Typography, Flex, Button } from 'antd';
import React, { useEffect } from 'react';
import { CheckCircleOutlined, WarningFilled } from '@ant-design/icons';
import { StyledCard } from './LocationInfo.style';
import ModalReport from '../ModalReport/ModalReport';
import { useModalReport } from '../../contexts/ModalReportProvider';
const { Title, Paragraph } = Typography;

function LocationInfo({ locationDetail }) {
  const { dispatch } = useModalReport();

  const showModal = () => {
    console.log('On lcik');
    dispatch({
      type: 'ON_OPEN_MODAL',
      payload: {
        category: 'Thông tin địa điểm',
        locationDetail,
      },
    });
  };

  return (
    <StyledCard>
      <Flex gap={10}>
        <div
          style={{
            paddingTop: 2,
          }}
        >
          <CheckCircleOutlined
            style={{
              fontSize: 16,
            }}
          />
        </div>
        <div>
          <Title level={5} style={{ margin: 0, marginBottom: 10 }}>
            Thông tin địa điểm
          </Title>
          <Paragraph level={5} strong style={{ margin: 0 }}>
            {locationDetail.name}
          </Paragraph>
          <Paragraph level={5}>{locationDetail.address}</Paragraph>
        </div>
      </Flex>
      <Flex justify='flex-end' align='center'>
        <Button ghost danger onClick={showModal}>
          <WarningFilled />
          BÁO CÁO VI PHẠM
        </Button>
        <ModalReport />
      </Flex>
    </StyledCard>
  );
}

export default LocationInfo;
