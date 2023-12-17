import React, { useEffect, useState } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'

import { useNavigate } from 'react-router-dom'
// TODO
const AdsPanelTypeDetail = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const URL = `http://localhost:4000/v1/vhtt/ads-panel-types/${id}`

  const [data, setData] = useState({})

  // Fetch data
  const fetchData = async () => {
    let data = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    data = await data.json()
    setData(data)
  }

  const navigateToUpdate = () => {
    navigate(`/admin/ads_panel_types/${id}/update`)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CCard className="mb-4">
      <CCardBody>
        <h4 id="ads-panel-type-title" className="card-title mb-0">
          Chi tiết loại bảng quảng cáo
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
                <CFormInput type="email" id="inputEmail3" defaultValue={data.name} disabled />
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
                onClick={navigateToUpdate}
                variant="contained"
                startIcon={<EditIcon />}
                color="success"
                sx={{
                  borderRadius: '8px',
                }}
              >
                Sửa
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
                onClick={() => console.log('Xóa')}
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

export default AdsPanelTypeDetail
