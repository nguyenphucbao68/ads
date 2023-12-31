import React from 'react';
import { Typography } from 'antd';
import {
  StyledCard,
  StyledFlex,
  StyledCloseCircleOutlined,
  CardBody,
} from './AdsPanelDetail.style';
import { useAdsPanelDetail } from '../../contexts/AdsPanelDetailProvider';
const { Title, Text, Paragraph } = Typography;

function AdsPanelDetail(props) {
  const { showAdsPanelDetail, onClosePanelDetail } = useAdsPanelDetail();

  return (
    <React.Fragment>
      {showAdsPanelDetail && (
        <StyledFlex align='center'>
          <StyledCard hoverable>
            <img
              src='https://prviet.vn/ImageUpload/userfiles/images/HINH-TONG-HOP/thiet-ke-thi-cong-pano-quang-cao-ngoai-troi-pano-cot-bien-thiet-ke-quang-cao-prviet-02.jpg'
              alt='Hình ảnh bảng quảng cáo'
            />
            <StyledCloseCircleOutlined onClick={onClosePanelDetail} />
            <CardBody vertical>
              <Title level={5}>
                Làm Bảng Hiệu - Quảng cáo An Phát, Hồ Chí Minh
              </Title>
              <Paragraph level={5}>Trụ, cụm pano</Paragraph>
              <Paragraph level={5}>Ngày hết hạn: 12/12/2023</Paragraph>
              <Paragraph level={5}>
                Đồng Khởi - Nguyễn Du (Sở Văn hoá và Thể thao), Phường Bến Nghé,
                Quận 1
              </Paragraph>
              <Paragraph level={5}>Kích thước: 2.5m x 10m</Paragraph>
              <Paragraph level={5}>Số lượng: 1 trụ/bảng</Paragraph>
              <Paragraph level={5}>Hình thức: Cổ động chính trị</Paragraph>
              <Paragraph level={5}>
                Phân loại: Đất công/công viên/Hành lang an toàn
              </Paragraph>
            </CardBody>
          </StyledCard>
        </StyledFlex>
      )}
    </React.Fragment>
  );
}

export default AdsPanelDetail;
