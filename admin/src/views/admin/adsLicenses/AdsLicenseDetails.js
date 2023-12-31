import React, { useState, useEffect } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import * as adsLicenseService from 'src/services/adsLicense'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ConfirmModal from 'src/modals/ConfirmModal'

const AdsLicenseDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState({
    showConfirmModal: false,
    title: '',
    content: '',
    onConfirm: () => {},
    adsLicense: {
      id,
      ads_panel_id: '',
      ads_panel: {
        id: 1,
        width: 0.0,
        height: 0.0,
        ads_panel_type: {
          id: 1,
          name: '',
        },
        ads_spot: {
          id: 1,
          address: '',
          spot_type: {
            id: 1,
            name: '',
          },
          ads_type: {
            id: 1,
            name: '',
          },
          max_ads_panel: 0,
          is_available: false,
        },
      },
      content: '',
      user_id: 1,
      user: {
        id: 1,
        name: '',
      },
      start_date: '',
      expire_date: '',
      status: 0,
      name: '',
      email: '',
      address: '',
      phone: '',
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      const adsLicenseRes = await adsLicenseService.getById(id)
      setData((pre) => ({
        ...pre,
        adsLicense: adsLicenseRes,
      }))
    }

    fetchData()
  }, [id])

  return (
    <CCard
      className="mb-4"
      sx={{
        backgroundColor: '#fff',
      }}
    >
      <Toaster position="top-right" reverseOrder={false} />
      <ConfirmModal
        visible={data.showConfirmModal}
        title={data.title}
        content={data.content}
        confirmText="Xác nhận"
        cancelText="Hủy"
        onConfirm={data.onConfirm}
        onCancel={() => setData((pre) => ({ ...pre, showConfirmModal: false }))}
      />
      <CCardBody>
        <h4 id="ads-spots-title" className="card-title">
          Chi tiết cấp phép quảng cáo
        </h4>
        <hr />
        <CForm>
          <Box
            sx={{
              height: 'calc(100vh - 350px)',
              width: '100%',
              overflowY: 'auto',
            }}
          >
            <CRow className="mb-2">
              <CFormLabel
                className="col-sm-6 col-form-label"
                style={{
                  fontWeight: 'bold',
                }}
              >
                Thông tin điểm đặt quảng cáo
              </CFormLabel>
              <CCol
                sm={6}
                className="pt-2"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  variant="text"
                  color="primary"
                  endIcon={<ArrowForwardIosIcon />}
                  onClick={() =>
                    navigate(`/admin/ads_spots/${data.adsLicense.ads_panel.ads_spot.id}`)
                  }
                >
                  Xem chi tiết
                </Button>
              </CCol>
            </CRow>
            <CRow className="mb-1">
              <CFormLabel htmlFor="inputAdsPanelAddress" className="col-sm-2 col-form-label">
                Địa chỉ
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="inputAdsPanelAddress"
                  readOnly
                  plainText
                  value={data.adsLicense.ads_panel.ads_spot.address}
                />
              </CCol>
            </CRow>
            <CRow className="mb-1">
              <CFormLabel htmlFor="inputAdsType" className="col-sm-2 col-form-label">
                Số lượng bảng quảng cáo tối đa
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="inputAdsType"
                  readOnly
                  plainText
                  value={`${data.adsLicense.ads_panel.ads_spot.max_ads_panel} bảng / điểm`}
                />
              </CCol>
            </CRow>
            <CRow className="mb-1">
              <CFormLabel htmlFor="inputAdsSpotType" className="col-sm-2 col-form-label">
                Loại vị trí
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="inputAdsSpotType"
                  readOnly
                  plainText
                  value={data.adsLicense.ads_panel.ads_spot.spot_type.name}
                />
              </CCol>
            </CRow>
            <CRow className="mb-1">
              <CFormLabel htmlFor="inputAdsType" className="col-sm-2 col-form-label">
                Hình thức quảng cáo
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="inputAdsType"
                  readOnly
                  plainText
                  value={data.adsLicense.ads_panel.ads_spot.ads_type.name}
                />
              </CCol>
            </CRow>
            <CRow className="mb-1">
              <CFormLabel htmlFor="inputIsAvailable" className="col-sm-2 col-form-label">
                Tình trạng quy hoạch
              </CFormLabel>
              <CCol sm={10}>
                <Box
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: data.adsLicense.ads_panel.ads_spot.is_available
                      ? 'success.main'
                      : 'error.main',
                    color: 'white',
                    p: '7px',
                    width: 'fit-content',
                    textAlign: 'center',
                  }}
                >
                  {data.adsLicense.ads_panel.ads_spot.is_available
                    ? 'Đã quy hoạch'
                    : 'Chưa quy hoạch'}
                </Box>
              </CCol>
            </CRow>
            <hr />
            <CRow className="mt-3 mb-2">
              <CFormLabel
                className="col-sm-6 col-form-label"
                style={{
                  fontWeight: 'bold',
                }}
              >
                Thông tin bảng quảng cáo
              </CFormLabel>
              <CCol
                sm={6}
                className="pt-2"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  variant="text"
                  color="primary"
                  endIcon={<ArrowForwardIosIcon />}
                  onClick={() =>
                    navigate(`/admin/ads_panels/${data.adsLicense.ads_panel.ads_spot.id}`)
                  }
                >
                  Xem chi tiết
                </Button>
              </CCol>
            </CRow>
            <CRow className="mb-1">
              <CFormLabel htmlFor="inputAdsPanelSize" className="col-sm-2 col-form-label">
                Kích thước
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="inputAdsPanelSize"
                  readOnly
                  plainText
                  value={`${data.adsLicense.ads_panel.width.toFixed(
                    2,
                  )}m x ${data.adsLicense.ads_panel.height.toFixed(2)}m`}
                />
              </CCol>
            </CRow>
            <CRow className="mb-1">
              <CFormLabel htmlFor="inputAdsPanelType" className="col-sm-2 col-form-label">
                Loại bảng quảng cáo
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="inputAdsPanelType"
                  readOnly
                  plainText
                  value={data.adsLicense.ads_panel.ads_panel_type.name}
                />
              </CCol>
            </CRow>
            <CRow className="mb-1">
              <CFormLabel htmlFor="inputAdsType" className="col-sm-2 col-form-label">
                Hình thức quảng cáo
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="inputAdsType"
                  readOnly
                  plainText
                  value={data.adsLicense.ads_panel.ads_spot.ads_type.name}
                />
              </CCol>
            </CRow>
            <hr />
            <CRow className="mt-3 mb-2">
              <CFormLabel
                className="col-sm-6 col-form-label"
                style={{
                  fontWeight: 'bold',
                }}
              >
                Thông tin công ty đặt quảng cáo
              </CFormLabel>
            </CRow>
            <CRow className="mb-1">
              <CFormLabel htmlFor="inputCompanyName" className="col-sm-2 col-form-label">
                Tên công ty
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="inputCompanyName"
                  readOnly
                  plainText
                  value={data.adsLicense.name}
                />
              </CCol>
            </CRow>
            <CRow className="mb-1">
              <CFormLabel htmlFor="inputCompanyEmail" className="col-sm-2 col-form-label">
                Email công ty
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="inputCompanyEmail"
                  readOnly
                  plainText
                  value={data.adsLicense.email}
                />
              </CCol>
            </CRow>
            <CRow className="mb-1">
              <CFormLabel htmlFor="inputCompanyPhone" className="col-sm-2 col-form-label">
                Số điện thoại công ty
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="inputCompanyPhone"
                  readOnly
                  plainText
                  value={data.adsLicense.phone}
                />
              </CCol>
            </CRow>
            <CRow className="mb-1">
              <CFormLabel htmlFor="inputAddressPhone" className="col-sm-2 col-form-label">
                Địa chỉ công ty
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="inputAddressPhone"
                  readOnly
                  plainText
                  value={data.adsLicense.address}
                />
              </CCol>
            </CRow>
          </Box>
          <Box
            sx={{
              width: '100%',
              marginTop: '20px',
            }}
          >
            <Grid container>
              <Grid
                item
                container
                direction="row"
                xs={6}
                justifyContent="flex-start"
                alignItems="center"
              >
                <span
                  style={{
                    marginRight: '10px',
                  }}
                >
                  Trạng thái:
                </span>
                <Box
                  sx={{
                    borderRadius: '8px',
                    backgroundColor:
                      data.adsLicense.status === 0
                        ? 'warning.main'
                        : data.adsLicense.status === 1
                        ? 'success.main'
                        : 'error.main',
                    color: 'white',
                    p: '7px',
                    textAlign: 'center',
                  }}
                >
                  {data.adsLicense.status === 0
                    ? 'Chờ duyệt'
                    : data.adsLicense.status === 1
                    ? 'Đã duyệt'
                    : 'Không phê duyệt'}
                </Box>
              </Grid>
              {data.adsLicense.status === 0 && (
                <Grid
                  item
                  xs={6}
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button
                    variant="text"
                    startIcon={<CheckCircleIcon />}
                    color="success"
                    sx={{
                      borderRadius: '8px',
                    }}
                    onClick={() => {
                      setData((pre) => ({
                        ...pre,
                        showConfirmModal: true,
                        title: 'Xác nhận phê duyệt',
                        content: 'Bạn có chắc chắn muốn phê duyệt cấp phép quảng cáo này?',
                        onConfirm: async () => {
                          const result = await adsLicenseService.update(id, { status: 1 })
                          setData((pre) => ({
                            ...pre,
                            showConfirmModal: false,
                            adsLicense: {
                              ...pre.adsLicense,
                              status: 1,
                            },
                          }))
                          if (result.id) {
                            toast.success('Phê duyệt cấp phép quảng cáo thành công')
                          } else {
                            toast.error('Phê duyệt cấp phép quảng cáo thất bại')
                          }
                        },
                      }))
                    }}
                  >
                    Phê duyệt
                  </Button>
                  <Button
                    variant="text"
                    startIcon={<HighlightOffIcon />}
                    color="error"
                    sx={{
                      borderRadius: '8px',
                    }}
                    onClick={() => {
                      setData((pre) => ({
                        ...pre,
                        showConfirmModal: true,
                        title: 'Xác nhận từ chối',
                        content: 'Bạn có chắc chắn muốn từ chối cấp phép quảng cáo này?',
                        onConfirm: async () => {
                          const result = await adsLicenseService.update(id, { status: 2 })
                          setData((pre) => ({
                            ...pre,
                            showConfirmModal: false,
                            adsLicense: {
                              ...pre.adsLicense,
                              status: 2,
                            },
                          }))
                          if (result.id) {
                            toast.success('Từ chối cấp phép quảng cáo thành công')
                          } else {
                            toast.error('Từ chối cấp phép quảng cáo thất bại')
                          }
                        },
                      }))
                    }}
                  >
                    Không phê duyệt
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default AdsLicenseDetails
