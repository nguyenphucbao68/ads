import React, { useEffect, useContext } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import SaveIcon from '@mui/icons-material/Save'
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import { DistrictContext } from 'src/contexts/DistrictProvider'
import * as wardService from 'src/services/ward'
import * as districtService from 'src/services/district'
import { useNavigate } from 'react-router-dom'

const WardCreate = () => {
  const { districts, dispatchDistricts } = useContext(DistrictContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ward_name: '',
      district_id: 1,
    },
  })

  const onSubmit = async (data) => {
    const result = await wardService.create({
      name: data.ward_name,
      district_id: parseInt(data.district_id, 10),
    })
    if (result.id) {
      navigate('/admin/wards', {
        state: {
          type: 'success',
          message: 'Thêm phường/xã thành công',
        },
      })
    } else {
      toast.error('Thêm phường/xã thất bại')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const districtsResponse = await districtService.getAll()
      dispatchDistricts({
        type: 'INITIALIZE_DISTRICTS',
        payload: districtsResponse || [],
      })
    }

    fetchData()
  }, [dispatchDistricts])

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
          Thêm phường/xã
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
              <CFormLabel htmlFor="inputWardName" className="col-sm-2 col-form-label">
                Tên phường/xã
              </CFormLabel>
              <CCol sm={10} className="pt-2">
                <CFormInput
                  type="text"
                  id="inputWardName"
                  placeholder="Nhập tên phường/xã"
                  {...register('ward_name', {
                    required: 'Vui lòng nhập tên phường/xã',
                  })}
                  feedback={errors.ward_name?.message}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="optDistrict" className="col-sm-2 col-form-label">
                Quận/huyện
              </CFormLabel>
              <CCol sm={10}>
                <select
                  className="form-select"
                  id="optDistrict"
                  name="optDistrict"
                  {...register('district_id', { required: 'Vui lòng chọn quận/huyện' })}
                >
                  {districts.rows.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
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
                  type="submit"
                  variant="contained"
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

export default WardCreate
