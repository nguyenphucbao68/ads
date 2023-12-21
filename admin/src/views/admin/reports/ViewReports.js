import React, { useEffect, useContext, useState } from 'react'

import { Box } from '@mui/material'
import { CCard, CCardBody } from '@coreui/react'

import { Toaster, toast } from 'sonner'
import { useLocation } from 'react-router-dom'

import ReportList from './ReportList'
import { ReportProvider } from 'src/contexts/ReportProvider'

const ViewReports = () => {
  const location = useLocation()

  const showSuccesToast = (message) => {
    toast.success(message)
  }

  useEffect(() => {
    if (location.state?.type === 'success') {
      showSuccesToast(location.state.message)
    }
  }, [location])

  return (
    <div className="view-reports">
      <CCard className="mb-4">
        <Toaster position="top-right" reverseOrder={false} />
        <CCardBody>
          <h4 className="card-title mb-0">Các báo cáo được người dân gửi về</h4>
          <Box
            sx={{
              height: 'calc(100vh - 300px)',
              width: '100%',
              marginTop: '15px',
            }}
          >
            <ReportProvider>
              <ReportList />
            </ReportProvider>
          </Box>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ViewReports
