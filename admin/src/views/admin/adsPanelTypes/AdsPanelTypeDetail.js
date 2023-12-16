import React from 'react'

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

// TODO
// This file is not in need. Delete later
const AdsPanelTypeDetail = () => {
  const { id } = useParams()
  console.log(id)

  return (
    <CCard className="mb-4">
      <CCardBody>
        <h4 id="ads-spots-title" className="card-title mb-0">
          Chi tiết điểm đặt quảng cáo
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
                Email
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="email" id="inputEmail3" />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                Password
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="password" id="inputPassword3" />
              </CCol>
            </CRow>
            <fieldset className="row mb-3">
              <legend className="col-form-label col-sm-2 pt-0">Radios</legend>
              <CCol sm={10}>
                <CFormCheck
                  type="radio"
                  name="gridRadios"
                  id="gridRadios1"
                  value="option1"
                  label="First radio"
                  defaultChecked
                />
                <CFormCheck
                  type="radio"
                  name="gridRadios"
                  id="gridRadios2"
                  value="option2"
                  label="Second radio"
                />
                <CFormCheck
                  type="radio"
                  name="gridRadios"
                  id="gridRadios3"
                  value="option3"
                  label="Third disabled radio"
                  disabled
                />
              </CCol>
            </fieldset>
            <CRow className="mb-3">
              <div className="col-sm-10 offset-sm-2">
                <CFormCheck type="checkbox" id="gridCheck1" label="Example checkbox" />
              </div>
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
                onClick={() => console.log('Lưu')}
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

export default AdsSpotDetails
