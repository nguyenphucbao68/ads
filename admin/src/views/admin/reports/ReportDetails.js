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
import * as ReportService from '../../../services/report'
import { useForm } from 'react-hook-form'

import he from 'he'
import { ReportContext } from 'src/contexts/ReportProvider'
const ReportDetails = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const { reports, dispatchReports } = useContext(ReportContext)
  const [element, setElement] = useState(null)
  const [visible, setVisible] = useState(false)
  const [currentModelImage, setCurrentModalImage] = useState('')
  useEffect(() => {
    setIsLoading(true)
    const e = reports.rows.find((value) => value.id == id)
    e.image = JSON.parse(e.image)
    setElement(e)
    setIsLoading(false)
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

  const onSubmit = async (data) => {
    if (data?.status === '1' || data?.status === '2') {
      const result = await ReportService.updateStatus(id, {
        status: data.status,
        user: {
          id: user?.id,
          email: element?.email,
        },
      })
      console.log(result)
      if (result.id) {
        navigate('/admin/report', {
          state: {
            type: 'success',
            message: `Cập nhật báo cáo thành công`,
          },
        })
      }
      return
    } else {
      toast.error('Vui lòng cập nhật trạng thái mới cho báo cáo')
    }
  }
  return (
    <div className="report-details">
      {isLoading ? (
        <CSpinner />
      ) : (
        <CCard className="mb-4">
          <Toaster position="top-right" reverseOrder={false} />

          {/* <Toaster position="top-right" reverseOrder={false} /> */}
          <CForm onSubmit={handleSubmit(onSubmit)}>
            <CCardBody>
              <h4 className="card-title mb-0">Chi tiết báo cáo của {element?.name}</h4>

              <Box
                sx={{
                  height: 'calc(700px)',
                  width: '100%',
                  overflowY: 'auto',
                }}
              >
                <CRow className="mt-2 mb-3">
                  <CFormLabel htmlFor="inputEmail" className="col-sm-2 col-form-label">
                    Email
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      id="inputEmail"
                      readOnly
                      plainText
                      value={element?.email}
                      //   {...register('email', {})}
                      //   feedback={errors.email?.message}
                    />
                  </CCol>
                </CRow>

                <CRow className="mt-2 mb-3">
                  <CFormLabel htmlFor="inputCreatedAt" className="col-sm-2 col-form-label">
                    Ngày gửi
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      id="inputCreatedAt"
                      readOnly
                      plainText
                      value={element?.created_at}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-2 mb-3">
                  <CFormLabel htmlFor="inputPhone" className="col-sm-2 col-form-label">
                    Số điện thoại
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      id="inputPhone"
                      readOnly
                      plainText
                      value={element?.phone}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-2 mb-3">
                  <CFormLabel htmlFor="inputAddress" className="col-sm-2 col-form-label">
                    Địa chỉ báo cáo
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
                  <CFormLabel htmlFor="inputReportType" className="col-sm-2 col-form-label">
                    Loại hình báo cáo
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput
                      type="text"
                      id="inputReportType"
                      readOnly
                      plainText
                      value={element?.report_type_name}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-2 mb-3">
                  <CFormLabel htmlFor="content" className="col-sm-2 col-form-label">
                    Nội dung báo cáo
                  </CFormLabel>
                  <CCol
                    sm={12}
                    style={{
                      overflowY: 'auto',
                      maxHeight: '150px',
                      backgroundColor: '#f5f5f5',
                      padding: '10px',
                      margin: '10px',
                      borderRadius: '8px',
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: he.decode(element?.content) }} />
                  </CCol>
                </CRow>
                <CRow className="mt-2 mb-3">
                  <CFormLabel htmlFor="inputStatus" className="col-sm-2 col-form-label">
                    Trạng thái
                  </CFormLabel>

                  <CCol sm={10}>
                    {/* <CFormInput type="text" id="inputStatus" value={element?.status} /> */}
                    <CFormSelect
                      id="inputStatus"
                      defaultValue={element?.status}
                      name="inputStatus"
                      {...register('status', { required: 'Vui lòng chọn trạng thái' })}
                      feedback={errors.status?.message}
                    >
                      {statusOptions.map((value, index) => (
                        <option key={index} value={value.value}>
                          {value.label}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="mt-2 mb-3">
                  <CFormLabel htmlFor="inputReportType" className="col-sm-2 col-form-label">
                    Ảnh
                  </CFormLabel>
                  {element?.image?.map((value, index) => (
                    <CCol key={index} sm={10}>
                      <Button>
                        <CImage
                          className="user-select-auto"
                          rounded
                          thumbnail
                          src={value}
                          width={200}
                          height={200}
                          onClick={() => {
                            setVisible(true)
                            setCurrentModalImage(value)
                          }}
                        />
                      </Button>
                    </CCol>
                  ))}

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
                          pathname: '/admin/report',
                        })
                      }
                    >
                      Quay lại
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        borderRadius: '8px',
                      }}
                    >
                      Cập nhật trạng thái
                    </Button>
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

export default ReportDetails
