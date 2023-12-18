import React, { useEffect } from 'react'
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
import { getProfile } from 'src/services/user'

const AccountUpdatePage = () => {
  const [profile, setProfile] = React.useState(null)

  useEffect(() => {
    getProfile().then((res) => {
      setProfile(res)
    })
  }, [])
  console.log('profile', profile)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>YOUR ACCOUNT</strong>
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
            {/* Birthday, Full Name, Phone number */}
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Birthday
              </CFormLabel>
              <div className="col-sm-10">
                <CFormInput type="date" id="inputPassword" />
              </div>
            </CRow>

            {/*  Full Name */}
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Full Name
              </CFormLabel>
              <div className="col-sm-10">
                <CFormInput type="text" id="inputPassword" />
              </div>
            </CRow>

            {/* Phone number */}
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Phone number
              </CFormLabel>
              <div className="col-sm-10">
                <CFormInput type="text" id="inputPassword" />
              </div>
            </CRow>
            {/* <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Password
              </CFormLabel>
              <div className="col-sm-10">
                <CFormInput type="password" id="inputPassword" />
              </div>
            </CRow> */}
            <CRow>
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label"></CFormLabel>
              <div className="col-sm-10">
                <CButton type="submit">Update</CButton>
              </div>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>UPDATE YOUR PASSWORD</strong>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Current Password
              </CFormLabel>
              <div className="col-sm-10">
                <CFormInput type="password" id="inputPassword" />
              </div>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                New Password
              </CFormLabel>
              <div className="col-sm-10">
                <CFormInput type="password" id="inputPassword" />
              </div>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                Re-Password
              </CFormLabel>
              <div className="col-sm-10">
                <CFormInput type="password" id="inputPassword" />
              </div>
            </CRow>
            <CRow>
              <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label"></CFormLabel>
              <div className="col-sm-10">
                <CButton type="submit">Update</CButton>
              </div>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AccountUpdatePage
