import React, { useEffect, useState } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'

import { useNavigate } from 'react-router-dom'
// TODO
const AdsPanelUpdate = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const URL = `http://localhost:4000/v1/vhtt/ads-panels/${id}`

  const [data, setData] = useState({})

  // Fetch data
  const init = async () => {
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
    init()
  }, [])

  return (
    <CCard className="mb-4">
      <CCardBody>
        <h4 id="ads-panel-type-title" className="card-title mb-0">
          Chi tiết bảng quảng cáo
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
                Loại
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="email" id="inputEmail3" defaultValue={data.ads_type_id} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Chiều cao
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="email" id="inputEmail3" defaultValue={data.height} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Chiều rộng
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="email" id="inputEmail3" defaultValue={data.width} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Ngày hết hạn
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="email" id="inputEmail3" defaultValue={data.expire_date} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Hình ảnh
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="email" id="inputEmail3" defaultValue={data.image} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Điểm đặt tại đây
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="email" id="inputEmail3" defaultValue={data.ads_spot_id} />
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

export default AdsPanelUpdate
