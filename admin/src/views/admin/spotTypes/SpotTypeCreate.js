import React from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import SaveIcon from '@mui/icons-material/Save'
import { useNavigate } from 'react-router-dom'
import * as spotTypeService from 'src/services/spotType'

const SpotTypeCreate = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState, getValues } = useForm()

  const onSave = async () => {
    const name = getValues('name')
    await spotTypeService.create({ name })

    navigate('/admin/spot_types')
  }

  return (
    <CCard className="mb-4">
      <CCardBody>
        <h4 id="ads-panel-type-title" className="card-title mb-0">
          Tạo mới loại đất
        </h4>
        <Box
          sx={{
            height: 'calc(100vh - 340px)',
            width: '100%',
            marginTop: '15px',
          }}
        >
          <CForm onSubmit={handleSubmit(onSave)}>
            <CRow className="mb-3">
              <CFormLabel htmlFor="spotTypeName" className="col-sm-2 col-form-label">
                Tên
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="spotTypeName"
                  {...register('name', {
                    required: 'Vui lòng nhập tên loại bảng quảng cáo',
                    minLength: 1,
                  })}
                />
              </CCol>
            </CRow>
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
                    type="submit"
                    disabled={!formState.isDirty}
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
                ></Grid>
              </Grid>
            </Box>
          </CForm>
        </Box>
      </CCardBody>
    </CCard>
  )
}

export default SpotTypeCreate
