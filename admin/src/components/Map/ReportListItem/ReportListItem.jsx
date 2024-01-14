import { Col, Row, Typography, Image } from 'antd'
import React, { useEffect, useRef } from 'react'
import { LeftOutlined } from '@ant-design/icons'
const { Paragraph, Link, Text } = Typography

function ReportListItem({ goBack, item }) {
  console.log({ item })
  const images = JSON.parse(item.image)
  const content = item.content

  const colRef = useRef()

  useEffect(() => {
    colRef.current.innerHTML = content
  }, [])

  return (
    <React.Fragment>
      <Row gutter={10} style={{ marginTop: '20px' }} align={'middle'}>
        <Col span={7}>
          <Paragraph strong style={{ margin: '10px 0px' }}>
            Phân loại:
          </Paragraph>
        </Col>
        <Col>{item.reportCategory}</Col>
      </Row>{' '}
      <Row gutter={10} align={'middle'}>
        <Col span={7}>
          <Paragraph strong style={{ margin: '10px 0px' }}>
            Hình thức báo cáo:
          </Paragraph>
        </Col>
        <Col>{item.reportType}</Col>
      </Row>
      <Row gutter={10} align={'middle'}>
        <Col span={7}>
          <Paragraph strong style={{ margin: '10px 0px' }}>
            Họ tên:
          </Paragraph>
        </Col>
        <Col>{item.name}</Col>
      </Row>
      <Row gutter={10} align={'middle'}>
        <Col span={7}>
          <Paragraph strong style={{ margin: '10px 0px' }}>
            Email:
          </Paragraph>
        </Col>
        <Col>{item.email}</Col>
      </Row>
      <Row gutter={10} align={'middle'}>
        <Col span={7}>
          <Paragraph strong style={{ margin: '10px 0px' }}>
            Số điện thoại:
          </Paragraph>
        </Col>
        <Col>{item.phone}</Col>
      </Row>
      <Row gutter={10} align={'middle'}>
        <Col span={7}>
          <Paragraph strong style={{ margin: '10px 0px' }}>
            Hình ảnh
          </Paragraph>
        </Col>
        <Col>
          {images.length > 0 ? (
            <Image.PreviewGroup>
              {images.map((img, idx) => (
                <Image key={idx} width={50} src={img} />
              ))}
            </Image.PreviewGroup>
          ) : (
            <Text>Không có hình ảnh</Text>
          )}
        </Col>
      </Row>
      <Row gutter={10} align={'middle'}>
        <Col span={7}>
          <Paragraph strong style={{ margin: '10px 0px' }}>
            Nội dung báo cáo:
          </Paragraph>
        </Col>
        <Col ref={colRef}></Col>
      </Row>
      <Link onClick={goBack}>
        <LeftOutlined /> Quay lại
      </Link>
    </React.Fragment>
  )
}

export default ReportListItem
