import React, { useEffect, useContext, useState } from 'react'

import { Box, Button, Grid } from '@mui/material'
import {
  CForm,
  CCol,
  CRow,
  CFormLabel,
  CFormInput,
  CModal,
  CModalBody,
  CButton,
  CModalFooter,
  CCard,
  CCardBody,
  CSpinner,
  CImage,
} from '@coreui/react'
import { Toaster, toast } from 'sonner'

import { useNavigate, useParams } from 'react-router-dom'
import * as spotTypeService from 'src/services/spotType'
import * as asdTypeService from 'src/services/adsType'
import * as ICRService from 'src/services/changeRequest'
import * as asdPanelTypeService from 'src/services/adsPanelType'

import { ICRContext } from 'src/contexts/InformationChangeRequest'
const InformationChangeDetails = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const { ICRs } = useContext(ICRContext)
  const [adsTypes, setAdsTypes] = useState([])
  const [spotTypes, setSpotTypes] = useState([])
  const [adsPanelTypes, setAdsPanelTypes] = useState([])
  const [element, setElement] = useState(null)
  const [visible, setVisible] = useState(false)
  const [currentModelImage, setCurrentModalImage] = useState('')
  useEffect(() => {
    setIsLoading(true)
    setElement(ICRs.rows.find((value) => value.id == id))
    console.log(element)
    setIsLoading(false)
    const fetchAdsTypes = async () => {
      const adsTypesResponse = await asdTypeService.getAll()
      return adsTypesResponse
    }

    const fetchSpotTypes = async () => {
      const spotTypesResponse = await spotTypeService.getAll()
      return spotTypesResponse
    }

    const fetchAdsPanelTypes = async () => {
      const adsPanelTypesResponse = await asdPanelTypeService.getAll()
      return adsPanelTypesResponse
    }

    fetchAdsPanelTypes().then((res) => {
      setAdsPanelTypes(res)
    })

    fetchAdsTypes().then((res) => {
      setAdsTypes(res)
    })

    fetchSpotTypes().then((res) => {
      setSpotTypes(res)
    })
  }, [])

  const navigate = useNavigate()
  const ACCEPT = 2
  const CANCEL = 1

  const onAcceptSubmit = async () => {
    const result = await ICRService.update(element.id, ACCEPT)
    if (result.id) {
      toast.info('Cập nhật yêu cầu thành công')
      navigate('/admin/approval/approve_edit_requests', {
        state: {
          type: 'success',
          message: 'Cập nhật yêu cầu thành công',
        },
      })
    }
  }
  const onCancelSubmit = async () => {
    const result = await ICRService.update(element.id, CANCEL)
    if (result.id) {
      toast.info('Cập nhật yêu cầu thành công')
      navigate('/admin/approval/approve_edit_requests', {
        state: {
          type: 'success',
          message: 'Hủy yêu cầu cập nhật thành công',
        },
      })
    }
  }
  return (
    <div className="information-change-details">
      {isLoading ? (
        <CSpinner />
      ) : (
        <CCard className="mb-4">
          <Toaster position="top-right" reverseOrder={false} />

          {/* <Toaster position="top-right" reverseOrder={false} /> */}
          <CForm>
            <CCardBody>
              <h4 className="card-title mb-0">Chi tiết báo cáo của {element?.name}</h4>

              <Box
                sx={{
                  height: 'calc(450px)',
                  width: '100%',
                  overflowY: 'auto',
                }}
              >
                <CRow className="mt-2 mb-3">
                  <CFormLabel htmlFor="inputAddress" className="col-sm-2 col-form-label">
                    Địa chỉ
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      id="inputAddress"
                      readOnly
                      plainText
                      value={`${element?.old_information.address}, ${element?.old_information.ward.name}, ${element?.old_information.district.name}`}
                    />
                  </CCol>
                </CRow>

                <CRow className="mt-2 mb-3">
                  <CFormLabel htmlFor="inputEditedAt" className="col-sm-2 col-form-label">
                    Ngày chỉnh sửa
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      id="inputEditedAt"
                      readOnly
                      plainText
                      value={
                        new Date(element?.edited_at)
                          .toISOString()
                          .replace(/T/, ' ') // replace T with a space
                          .replace(/\..+/, '') // delete the dot and everything after
                      }
                    />
                  </CCol>
                </CRow>

                <CRow className="mt-2 mb-3">
                  <CFormLabel htmlFor="inputType" className="col-sm-2 col-form-label">
                    Loại chỉnh sửa
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      id="inputType"
                      readOnly
                      plainText
                      value={element?.type == 1 ? 'Điểm đặt' : 'Bảng quảng cáo'}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-2 mb-3">
                  <CFormLabel htmlFor="inputReason" className="col-sm-2 col-form-label">
                    Lí do chỉnh sửa
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      id="inputReason"
                      readOnly
                      plainText
                      value={element?.reason}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-2 mb-3">
                  <CFormLabel htmlFor="inputStatus" className="col-sm-2 col-form-label">
                    Trạng thái
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      id="inputStatus"
                      readOnly
                      plainText
                      value={
                        element?.status == 0
                          ? 'Đang chờ duyệt'
                          : element?.status == 1
                          ? 'Hủy bỏ'
                          : 'Đã chấp thuận'
                      }
                    />
                  </CCol>
                </CRow>
                {element?.type == 0 && (
                  <CRow className="mt-2 mb-3">
                    <CFormLabel htmlFor="inputAdsPanelType" className="col-sm-2 col-form-label">
                      Loại bảng quảng cáo
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        type="text"
                        id="inputAdsPanelType"
                        readOnly
                        plainText
                        value={`${
                          adsPanelTypes.find(
                            (value) => value.id == [element?.old_information?.ads_type_id],
                          )?.name
                        }->${
                          adsPanelTypes.find(
                            (value) => value.id == [element?.new_information?.ads_type_id],
                          )?.name
                        }`}
                      />
                    </CCol>
                  </CRow>
                )}
                {element?.type == 0 && (
                  <CRow className="mt-2 mb-3">
                    <CFormLabel htmlFor="inputHeight" className="col-sm-2 col-form-label">
                      Chiều cao
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        type="text"
                        id="inputHeight"
                        readOnly
                        plainText
                        value={`${element?.old_information?.height}->${element?.new_information?.height}`}
                      />
                    </CCol>
                  </CRow>
                )}
                {element?.type == 0 && (
                  <CRow className="mt-2 mb-3">
                    <CFormLabel htmlFor="inputWidth" className="col-sm-2 col-form-label">
                      Chiều rộng
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        type="text"
                        id="inputWidth"
                        readOnly
                        plainText
                        value={`${element?.old_information?.width}->${element?.new_information?.width}`}
                      />
                    </CCol>
                  </CRow>
                )}
                {element?.type == 0 && (
                  <CRow className="mt-2 mb-3">
                    <CFormLabel htmlFor="inputExpire" className="col-sm-2 col-form-label">
                      Ngày hết hạn
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        type="text"
                        id="inputExpire"
                        readOnly
                        plainText
                        value={`${formatDate(element?.old_information?.expire_date)}->${
                          element?.new_information?.expire_date
                        }`}
                      />
                    </CCol>
                  </CRow>
                )}
                {element?.type == 1 && (
                  <CRow className="mt-2 mb-3">
                    <CFormLabel htmlFor="inputSpotType" className="col-sm-2 col-form-label">
                      Loại quảng cáo
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        type="text"
                        id="inputSpotType"
                        readOnly
                        plainText
                        value={`${
                          spotTypes.find(
                            (value) => value.id == [element?.old_information?.spot_type_id],
                          )?.name
                        }->${
                          spotTypes.find(
                            (value) => value.id == [element?.new_information?.spot_type_id],
                          )?.name
                        }`}
                      />
                    </CCol>
                  </CRow>
                )}
                {element?.type == 1 && (
                  <CRow className="mt-2 mb-3">
                    <CFormLabel htmlFor="inputAdsType" className="col-sm-2 col-form-label">
                      Hình thức quảng cáo
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        type="text"
                        id="inputSpotType"
                        readOnly
                        plainText
                        value={`${
                          adsTypes.find(
                            (value) => value.id == [element?.old_information?.ads_type_id],
                          )?.name
                        }->${
                          adsTypes.find(
                            (value) => value.id == [element?.new_information?.ads_type_id],
                          )?.name
                        }`}
                      />
                    </CCol>
                  </CRow>
                )}
                {element?.type == 1 && (
                  <CRow className="mt-2 mb-3">
                    <CFormLabel htmlFor="inputAdsType" className="col-sm-2 col-form-label">
                      Số bảng quảng cáo tối đa
                    </CFormLabel>
                    <CCol sm={10}>
                      <CFormInput
                        type="text"
                        id="inputSpotType"
                        readOnly
                        plainText
                        value={`${element?.old_information?.max_ads_panel}->${element?.new_information?.max_ads_panel}`}
                      />
                    </CCol>
                  </CRow>
                )}

                <CRow className="mt-2 mb-3">
                  <CFormLabel htmlFor="inputReportType" className="col-sm-2 col-form-label">
                    Ảnh
                  </CFormLabel>
                  <CCol sm={10}>
                    <Button style={{ display: 'inline-block' }}>
                      <CImage
                        className="user-select-auto"
                        rounded
                        thumbnail
                        src={element?.old_information?.image}
                        width={200}
                        height={200}
                        onClick={() => {
                          setVisible(true)
                          setCurrentModalImage(element?.old_information?.image)
                        }}
                      />
                    </Button>
                    <p style={{ display: 'inline-block' }}>-&gt;</p>
                    <Button style={{ display: 'inline-block' }}>
                      <CImage
                        className="user-select-auto"
                        rounded
                        thumbnail
                        src={element?.new_information?.image}
                        width={200}
                        height={200}
                        onClick={() => {
                          setVisible(true)
                          setCurrentModalImage(element?.new_information?.image)
                        }}
                      />
                    </Button>
                  </CCol>

                  <CModal
                    backdrop="static"
                    visible={visible}
                    onClose={() => setVisible(false)}
                    aria-labelledby="StaticBackdropExampleLabel"
                  >
                    <CModalBody>
                      <CImage
                        className="user-select-auto"
                        rounded
                        thumbnail
                        src={currentModelImage}
                        width={500}
                        height={500}
                        onClick={() => setVisible(true)}
                      />
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                      </CButton>
                    </CModalFooter>
                  </CModal>
                </CRow>

                <Grid container>
                  <Grid
                    item
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    gap={2}
                  >
                    <Button
                      color="warning"
                      variant="contained"
                      sx={{
                        borderRadius: '8px',
                      }}
                      onClick={() =>
                        navigate({
                          pathname: '/admin/approval/approve_edit_requests',
                        })
                      }
                    >
                      Quay lại
                    </Button>
                    {element?.status == 0 && (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                          borderRadius: '8px',
                        }}
                        onClick={onAcceptSubmit}
                      >
                        Duyệt yêu cầu
                      </Button>
                    )}
                    {element?.status == 0 && (
                      <Button
                        type="submit"
                        variant="contained"
                        color="error"
                        sx={{
                          borderRadius: '8px',
                        }}
                        onClick={onCancelSubmit}
                      >
                        Hủy bỏ yêu cầu
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </CCardBody>
          </CForm>
        </CCard>
      )}
    </div>
  )
}
const formatDate = (dateTime) => {
  const date = new Date(dateTime)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const expireDate = `${year}-${month < 10 ? `0${month}` : `${month}`}-${
    day < 10 ? `0${day}` : `${day}`
  }`

  return expireDate
}

export default InformationChangeDetails
