import React from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import SaveIcon from '@mui/icons-material/Save'
import { useNavigate } from 'react-router-dom'
import * as adsTypeService from 'src/services/adsType'

const AdsTypeCreate = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState, getValues } = useForm()

  const onSave = async () => {
    const name = getValues('name')
    await adsTypeService.create({ name })

    navigate('/admin/ads_types')
  }

  return (
    <CCard className="mb-4">
      <CCardBody>
        <h4 id="ads-panel-type-title" className="card-title mb-0">
          Tạo mới loại hình quảng cáo
        </h4>
        <CForm onSubmit={handleSubmit(onSave)}>
          <Box
            sx={{
              height: 'calc(100vh - 340px)',
              width: '100%',
              marginTop: '15px',
            }}
          >
            <CRow className="mb-3">
              <CFormLabel htmlFor="adsTypeName" className="col-sm-2 col-form-label">
                Tên
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="adsTypeName"
                  placeholder="Nhập tên loại hình quảng cáo"
                  {...register('name', {
                    required: 'Vui lòng nhập tên loại bảng quảng cáo',
                    minLength: 1,
                  })}
                />
              </CCol>
            </CRow>
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
      </CCardBody>
    </CCard>
  )
}

export default AdsTypeCreate
