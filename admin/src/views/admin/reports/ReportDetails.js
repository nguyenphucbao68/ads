import React, { useEffect, useContext, useState } from 'react'

import { Box, Button, List } from '@mui/material'
import {
  CForm,
  CCol,
  CRow,
  CFormLabel,
  CFormInput,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CButton,
  CModalFooter,
  CCard,
  CCardBody,
  CSpinner,
  CImage,
} from '@coreui/react'

import { useNavigate, useParams } from 'react-router-dom'
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
    setElement(reports.rows.find((value) => value.id == id))
    setIsLoading(false)
  }, [])
  return (
    <div className="report-details">
      {isLoading ? (
        <CSpinner />
      ) : (
        <CCard className="mb-4">
          {/* <Toaster position="top-right" reverseOrder={false} /> */}
          <CCardBody>
            <h4 className="card-title mb-0">Chi tiết báo cáo của {element?.name}</h4>

            <CForm>
              <Box
                sx={{
                  height: 'calc(450px)',
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
                  <CFormLabel htmlFor="inputReportType" className="col-sm-2 col-form-label">
                    Ảnh
                  </CFormLabel>
                  {element.image.map((value, index) => (
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
              </Box>
            </CForm>
          </CCardBody>
        </CCard>
      )}
    </div>
  )
}

export default ReportDetails
