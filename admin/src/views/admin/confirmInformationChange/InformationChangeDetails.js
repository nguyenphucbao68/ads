import React, { useEffect, useContext, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

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
  CFormSelect,
} from '@coreui/react'
import { Toaster, toast } from 'sonner'

import { useNavigate, useParams } from 'react-router-dom'
import * as ICRService from 'src/services/changeRequest'
import * as spotTypeService from 'src/services/spotType'
import * as asdTypeService from 'src/services/adsType'
import { useForm } from 'react-hook-form'

import { ICRContext } from 'src/contexts/InformationChangeRequest'
const InformationChangeDetails = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const { ICRs } = useContext(ICRContext)
  const [adsTypes, setAdsTypes] = useState([])
  const [spotTypes, setSpotTypes] = useState([])
  const [element, setElement] = useState(null)
  const [visible, setVisible] = useState(false)
  const [currentModelImage, setCurrentModalImage] = useState('')
  useEffect(() => {
    setIsLoading(true)
    setElement(ICRs.rows.find((value) => value.id == id))
    setIsLoading(false)
    const fetchAdsTypes = async () => {
      const adsTypesResponse = await asdTypeService.getAll()
      return adsTypesResponse
    }

    const fetchSpotTypes = async () => {
      const spotTypesResponse = await spotTypeService.getAll()
      return spotTypesResponse
    }

    fetchAdsTypes().then((res) => {
      setAdsTypes(res)
    })

    fetchSpotTypes().then((res) => {
      setSpotTypes(res)
    })
  }, [])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const statusOptions = [
    { value: '0', label: 'Chưa xử lí' },
    { value: '1', label: 'Đang xử lí' },
    { value: '2', label: 'Đã xử lí' },
  ]

  const [content, setContent] = useState('')

  const user = JSON.parse(localStorage.getItem('user'))

  const navigate = useNavigate()

  const onAcceptSubmit = async (data) => {
    // if ((data?.status === '1' || data?.status === '2') && content) {
    //   const result = await ReportService.updateStatus(id, {
    //     status: data.status,
    //     content: content,
    //     user: {
    //       id: user?.id,
    //       email: element?.email,
    //     },
    //   })
    //   if (result.id) {
    //     navigate('/admin/report', {
    //       state: {
    //         type: 'success',
    //         message: `Cập nhật báo cáo thành công`,
    //       },
    //     })
    //   }
    //   return
    // } else {
    //   toast.error('Vui lòng cập nhật trạng thái mới cho báo cáo')
    // }
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
                      value={element?.address}
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
                {element?.type == 1 && (
                  <CRow className="mt-2 mb-3">
                    <CFormLabel htmlFor="inputSpotType" className="col-sm-2 col-form-label">
                      Loại bảng quảng cáo
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

export default InformationChangeDetails
