import React from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import SaveIcon from '@mui/icons-material/Save'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import * as districtService from 'src/services/district'

const DistrictCreate = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    values: {
      district_name: '',
    },
  })

  const onSubmit = async (data) => {
    const result = await districtService.create({
      name: data.district_name,
    })
    if (result.id) {
      navigate('/admin/districts', {
        state: {
          type: 'success',
          message: 'Thêm quận/huyện thành công',
        },
      })
    } else {
      toast.error('Thêm quận/huyện thất bại')
    }
  }

  return (
    <CCard
      className="mb-4"
      sx={{
        backgroundColor: '#fff',
      }}
    >
      <Toaster position="top-right" reverseOrder={false} />
      <CCardBody>
        <h4 id="ads-spots-title" className="card-title">
          Thêm quận/huyện
        </h4>
        <hr />
        <CForm onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              height: 'calc(100vh - 350px)',
              width: '100%',
              overflowY: 'auto',
            }}
          >
            <CRow className="mt-2 mb-3">
              <CFormLabel htmlFor="inputDistrictName" className="col-sm-2 col-form-label">
                Tên quận/huyện
              </CFormLabel>
              <CCol sm={10} className="pt-2">
                <CFormInput
                  type="text"
                  id="inputDistrictName"
                  placeholder="Nhập tên quận/huyện"
                  {...register('district_name', {
                    required: 'Vui lòng nhập tên quận/huyện',
                    validate: (value) => value.trim() !== '' || 'Vui lòng nhập tên quận/huyện',
                  })}
                  feedback={errors.district_name?.message}
                />
                <span className="text-danger">{errors.district_name?.message}</span>
              </CCol>
            </CRow>
          </Box>
          <Box
            sx={{
              width: '100%',
              marginTop: '20px',
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
                  variant="contained"
                  type="submit"
                  startIcon={<SaveIcon />}
                  color="primary"
                  disabled={!formState.isDirty}
                  sx={{
                    borderRadius: '8px',
                  }}
                >
                  Thêm
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default DistrictCreate
