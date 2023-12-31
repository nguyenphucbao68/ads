import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'

const UserCreatePage = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>CREATE/EDIT AN USER</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                Email
              </CFormLabel>
              <div className="col-sm-10">
                <CFormInput
                  type="text"
                  id="staticEmail"
                  defaultValue="email@example.com"
                  readOnly
                  plainText
                />
              </div>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Password
              </CFormLabel>
              <div className="col-sm-10">
                <CFormInput type="password" id="inputPassword" />
              </div>
            </CRow>
            <CRow>
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label"></CFormLabel>
              <div className="col-sm-10">
                <CButton type="submit">Create</CButton>
              </div>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserCreatePage
