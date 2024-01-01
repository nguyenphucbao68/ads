import React from 'react';
import { Typography } from 'antd';
import {
  StyledCard,
  StyledFlex,
  StyledCloseCircleOutlined,
  CardBody,
} from './AdsPanelDetail.style';
import { useAdsPanelDetail } from '../../contexts/AdsPanelDetailProvider';
import { getFormattedAddress } from '../../common/common';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;

function AdsPanelDetail() {
  const { adsPanelDetail, onClosePanelDetail } = useAdsPanelDetail();

  return (
    <React.Fragment>
      {adsPanelDetail && (
        <StyledFlex align='center'>
          <StyledCard hoverable>
            <img
              src='https://prviet.vn/ImageUpload/userfiles/images/HINH-TONG-HOP/thiet-ke-thi-cong-pano-quang-cao-ngoai-troi-pano-cot-bien-thiet-ke-quang-cao-prviet-02.jpg'
              alt='Hình ảnh bảng quảng cáo'
            />
            <StyledCloseCircleOutlined onClick={onClosePanelDetail} />
            <CardBody vertical>
              <Title level={5}>{adsPanelDetail.ads_panel_type.name}</Title>
              <Paragraph level={5}>
                Ngày hết hạn: {moment(adsPanelDetail.expire_date).format('L')}
              </Paragraph>
              <Paragraph level={5}>
                {getFormattedAddress(
                  adsPanelDetail.ads_spot.address,
                  adsPanelDetail.ads_spot.ward.name,
                  adsPanelDetail.ads_spot.district.name
                )}
              </Paragraph>
              <Paragraph level={5}>
                Kích thước: {+adsPanelDetail.width.toFixed(1)}m x{' '}
                {+adsPanelDetail.height.toFixed(1)}m
              </Paragraph>
              <Paragraph level={5}>Số lượng: 1 trụ/bảng</Paragraph>
              <Paragraph level={5}>
                Hình thức: {adsPanelDetail.ads_spot.ads_type.name}
              </Paragraph>
              <Paragraph level={5}>
                Phân loại: {adsPanelDetail.ads_spot.spot_type.name}
              </Paragraph>
            </CardBody>
          </StyledCard>
        </StyledFlex>
      )}
    </React.Fragment>
  );
}

export default AdsPanelDetail;
