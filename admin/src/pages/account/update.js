import React from 'react'
import { CCol, CRow } from '@coreui/react'
import AccountUpdateInformation from 'src/components/Account/Update/Information'
import AccountUpdatePassword from 'src/components/Account/Update/Password'

const AccountUpdatePage = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <AccountUpdateInformation />
      </CCol>
      <CCol xs={12}>
        <AccountUpdatePassword />
      </CCol>
    </CRow>
  )
}

export default AccountUpdatePage
