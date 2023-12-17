import React, { useState, useEffect } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const DistrictDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState({
    district: {
      id,
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
    fetch(`${BACKEND_URL}/vhtt/districts/${id}`, {
      method: 'DELETE',
    })
      .then((rawData) => rawData.json())
      .then((data) => {
        if (data.is_deleted) {
          navigate('/admin/districts')
          toast.success('Xóa quận/huyện thành công')
        } else {
          toast.error('Xóa quận/huyện thất bại')
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${BACKEND_URL}/vhtt/districts/${id}`)
        .then((rawData) => rawData.json())
        .then((data) => {
          console.log(data)
          setData((pre) => ({
            ...pre,
            district: data,
          }))
        })
        .catch((err) => {
          console.log(err.message)
        })
    }

    fetchData()
  }, [id])

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
          Chi tiết quận/huyện
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
              <CFormLabel htmlFor="inputDistrictName" className="col-sm-2 col-form-label">
                Tên quận/huyện
              </CFormLabel>
              <CCol sm={10} className="pt-2">
                <CFormInput
                  type="text"
                  id="inputDistrictName"
                  placeholder="Nhập tên quận/huyện"
                  defaultValue={data.district.name}
                  {...register('district_name', {
                    required: 'Vui lòng nhập tên quận/huyện',
                  })}
                  feedback={errors.district_name?.message}
                />
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

export default DistrictDetails
