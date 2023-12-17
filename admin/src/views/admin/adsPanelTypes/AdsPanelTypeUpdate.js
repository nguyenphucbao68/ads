import React, { useEffect, useState } from 'react'

import { Box, Button, Grid } from '@mui/material'
import {
  CCard,
  CCardBody,
  CForm,
  CCol,
  CRow,
  CFormLabel,
  CFormInput,
  CFormCheck,
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import Modals from 'src/views/notifications/modals/Modals'

const AdsPanelTypeUpdate = () => {
  const { id } = useParams()
  console.log(id) // TODO Delete this later
  const URL = `http://localhost:4000/v1/vhtt/ads-panel-types/${id}`

  const [data, setData] = useState({})

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

  const save = async () => {
    //TODO lưu cần phải có token
  }

  const deletePanelType = async () => {
    //TODO xóa cần phải có token
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CCard className="mb-4">
      <CCardBody>
        <h4 id="ads-panel-type-title" className="card-title mb-0">
          Chỉnh sửa loại bảng quảng cáo
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
                onClick={() => {
                  save()
                }}
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
                onClick={() => {
                  // deletePanelType()
                  return <Modals />
                }}
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

export default AdsPanelTypeUpdate
