import React, { useEffect, useState } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'

const ReportTypeUpdate = () => {
  const { id } = useParams()
  const URL = `http://localhost:4000/v1/vhtt/report-types/${id}`
  const [data, setData] = useState({})

  /**
   *
   */
  const fetchData = async () => {
    let res = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    res = await res.json()
    setData(res)
  }

  /**
   *
   */
  const save = () => {}

  /**
   *
   */
  const deleteReportType = () => {}

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CCard className="mb-4">
      <CCardBody>
        <h4 id="report-type-title" className="card-title mb-0">
          Chi tiết loại báo cáo
        </h4>
        <Box
          sx={{
            height: 'calc(100vh - 340px)',
            width: '100%',
            marginTop: '15px',
          }}
        >
          <CForm>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Tên
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="email" id="inputEmail3" defaultValue={data.name} />
              </CCol>
            </CRow>
          </CForm>
        </Box>
        <Box
          sx={{
            width: '100%',
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
              <Button
                onClick={() => save()}
                variant="contained"
                startIcon={<SaveIcon />}
                color="primary"
                sx={{
                  borderRadius: '8px',
                }}
              >
                Lưu
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button
                onClick={() => deleteReportType()}
                variant="text"
                startIcon={<DeleteIcon />}
                color="error"
                sx={{
                  borderRadius: '8px',
                }}
              >
                Xóa
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CCardBody>
    </CCard>
  )
}

export default ReportTypeUpdate
