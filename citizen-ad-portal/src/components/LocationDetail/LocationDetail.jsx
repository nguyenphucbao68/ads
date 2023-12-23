import { Card, Typography, Flex } from 'antd';
import React from 'react';
import { WarningFilled } from '@ant-design/icons';
const { Title, Text } = Typography;

function LocationDetail() {
  return (
    <Card>
      <Title level={5}>Thông tin địa điểm</Title>
      <Text level={5}>
        Quân chủng hải quân - trung tâm văn phòng thương mai hải quân
      </Text>
      <Text level={5}>
        15, đường Lê Thánh Tôn, Phường Bến Nghé, quận 1, Thành phố Hồ Chí Minh
      </Text>
      <Flex justify='flex-end' align='center'>
        <Button danger>
          <WarningFilled />
          BÁO CÁO VI PHẠM
        </Button>
      </Flex>
    </Card>
  );
}

export default LocationDetail;
