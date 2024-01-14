import { Button, Col, Flex, List, Modal, Row, Tooltip, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Container } from './ReportList.style'
import {
  UnorderedListOutlined,
  AimOutlined,
  RightOutlined,
  LeftOutlined,
  PushpinOutlined,
  EnvironmentOutlined,
  ExceptionOutlined,
} from '@ant-design/icons'
import ReportListItem from '../ReportListItem/ReportListItem'
import { getFormattedAddress } from 'src/utils/address'
import * as reportService from 'src/services/report'
import { ReportContext } from 'src/contexts/ReportProvider'
import axios from 'axios'

const { Paragraph, Title, Link } = Typography

function ReportList() {
  const [showModalReport, setShowModalReport] = useState(false)
  const [viewDetailMode, setViewDetailMode] = useState(null)
  const [onHover, setOnHover] = useState(false)
  const [current, setCurrent] = useState(1)

  const { reports, dispatchReports } = useContext(ReportContext)
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      dispatchReports({ type: 'TURN_ON_LOADING' })
      const data = await reportService.getAll()
      console.log({ data_test: data })
      data.forEach((element) => {
        element.created_at = new Date(element.created_at)
          .toISOString()
          .replace(/T/, ' ') // replace T with a space
          .replace(/\..+/, '') // delete the dot and everything after
        element.image = element.image.split(',')
      })
      dispatchReports({
        type: 'INITIALIZE_REPORTS',
        payload: data || [],
      })

      // let res = []
      // for (let i = 0; i < data.length; i++) {
      //   const adsPanelDetail = await axios.get('http://localhost/v1')
      // }

      dispatchReports({ type: 'TURN_OFF_LOADING' })
    }

    fetchData()
  }, [dispatchReports, showModalReport])

  useEffect(() => {
    console.log({ reports })
  }, [reports])
  const handleOk = () => {
    setShowModalReport(false)
  }

  const handleCancel = () => {
    setShowModalReport(false)
  }

  const onModalReportOpen = () => {
    setShowModalReport(true)
    setCurrent(1)
    setViewDetailMode(null)
  }

  return (
    <Container>
      <Button
        onMouseOver={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
        shape={onHover ? 'round' : 'circle'}
        icon={<UnorderedListOutlined />}
        onClick={onModalReportOpen}
      >
        {onHover ? 'Xem lại các báo cáo vi phạm' : ''}
      </Button>
      <Modal
        width={600}
        title={viewDetailMode ? 'XEM CHI TIẾT BÁO CÁO VI PHẠM' : 'XEM LẠI BÁO CÁO VI PHẠM'}
        footer={null}
        open={showModalReport}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {!viewDetailMode ? (
          <List
            pagination={{
              position: 'bottom',
              align: 'center',
              onChange: (page) => setCurrent(page),
              pageSize: 2,
              defaultCurrent: 1,
              current,
            }}
            dataSource={reports.rows}
            renderItem={(item, idx) =>
              item.ads_panel_id ? (
                <List.Item key={idx}>
                  <Flex style={{ width: '100%' }} align="center" gap={10}>
                    <ExceptionOutlined style={{ fontSize: 34 }} />
                    <Flex vertical style={{ width: '70%' }}>
                      <Title level={5}>{'Phân loại: Báo cáo bảng quảng cáo'}</Title>
                      {/* <Paragraph>
                        {'Loại vị trí: ' + item.adsPanelItem.ads_spot.spot_type.name}
                      </Paragraph> */}
                      {/* <Paragraph>
                        {'Loại bảng quảng cáo: ' + item.adsPanelItem.ads_panel_type.name}
                      </Paragraph> */}
                      <Paragraph>
                        {'Địa chỉ: ' +
                          getFormattedAddress(item.address, item.ward_name, item.district_name)}
                      </Paragraph>
                      <Paragraph>{'Ngày gửi: ' + item.updated_at}</Paragraph>
                    </Flex>
                    <Link
                      style={{ marginLeft: 'auto' }}
                      onClick={() =>
                        setViewDetailMode({
                          ...item,
                          reportCategory: 'Bảng quảng cáo',
                        })
                      }
                    >
                      Xem chi tiết <RightOutlined />{' '}
                    </Link>
                  </Flex>
                </List.Item>
              ) : (
                <List.Item key={idx}>
                  <Flex style={{ width: '100%' }} align="center" gap={10}>
                    <EnvironmentOutlined style={{ fontSize: 34 }} />
                    <Flex vertical style={{ width: '70%' }}>
                      <Title level={5}>{'Phân loại: Báo cáo địa điểm'}</Title>
                      <Paragraph>{'Địa chỉ: ' + item.address}</Paragraph>
                      <Paragraph>{'Ngày gửi: ' + item.updated_at}</Paragraph>
                    </Flex>
                    <Link
                      style={{ marginLeft: 'auto' }}
                      onClick={() =>
                        setViewDetailMode({
                          ...item,
                          reportCategory: 'Địa điểm',
                        })
                      }
                    >
                      Xem chi tiết <RightOutlined />{' '}
                    </Link>
                  </Flex>
                </List.Item>
              )
            }
          />
        ) : (
          <ReportListItem goBack={() => setViewDetailMode(null)} item={viewDetailMode} />
        )}
      </Modal>
    </Container>
  )
}

export default ReportList
