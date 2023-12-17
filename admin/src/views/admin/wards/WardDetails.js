import React, { useState, useEffect, useContext } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { DistrictContext } from 'src/contexts/DistrictProvider'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const WardDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { districts, dispatchDistricts } = useContext(DistrictContext)
  const [data, setData] = useState({
    ward: {
      id,
      district: {
        id: 1,
        name: '',
      },
      name: '',
    },
  })

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
  }

  const onDelete = async () => {
    fetch(`${BACKEND_URL}/vhtt/wards/${id}`, {
      method: 'DELETE',
    })
      .then((rawData) => rawData.json())
      .then((data) => {
        if (data.is_deleted) {
          navigate('/admin/wards')
          toast.success('Xóa phường/xã thành công')
        } else {
          toast.error('Xóa phường/xã thất bại')
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${BACKEND_URL}/vhtt/districts`)
        .then((rawData) => rawData.json())
        .then((data) => {
          dispatchDistricts({
            type: 'INITIALIZE_DISTRICTS',
            payload: data || [],
          })
        })
        .catch((err) => {
          console.log(err.message)
        })

      fetch(`${BACKEND_URL}/vhtt/wards/${id}`)
        .then((rawData) => rawData.json())
        .then((data) => {
          console.log(data)
          setData((pre) => ({
            ...pre,
            ward: data,
          }))
        })
        .catch((err) => {
          console.log(err.message)
        })
    }

    fetchData()
  }, [id, dispatchDistricts])

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
          Chi tiết phường/xã
        </h4>
        <hr />
        <Box
          sx={{
            height: 'calc(100vh - 350px)',
            width: '100%',
            overflowY: 'auto',
          }}
        >
          <CForm onSubmit={handleSubmit(onSubmit)}>
            <CRow className="mt-2 mb-3">
              <CFormLabel htmlFor="inputWardName" className="col-sm-2 col-form-label">
                Tên phường/xã
              </CFormLabel>
              <CCol sm={10} className="pt-2">
                <CFormInput
                  type="text"
                  id="inputWardName"
                  placeholder="Nhập tên phường/xã"
                  defaultValue={data.ward.name}
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
                    <option
                      key={district.id}
                      defaultValue={district.id}
                      selected={district.id === data.ward.district.id}
                    >
                      {district.name}
                    </option>
                  ))}
                </select>
              </CCol>
            </CRow>
          </CForm>
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
                onClick={() => console.log('Lưu')}
                variant="contained"
                startIcon={<SaveIcon />}
                color="primary"
                disabled={!formState.isDirty}
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
                onClick={onDelete}
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

export default WardDetails
