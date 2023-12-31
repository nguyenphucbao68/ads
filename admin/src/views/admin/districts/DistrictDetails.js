import React, { useState, useEffect } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import * as districtService from 'src/services/district'
import ConfirmModal from 'src/modals/ConfirmModal'

const DistrictDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState({
    showConfirmModal: false,
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
  } = useForm({
    values: {
      district_name: data.district.name,
    },
  })

  const onSubmit = async (data) => {
    const result = await districtService.update(id, {
      name: data.district_name,
    })
    if (result.id) {
      setData((pre) => ({
        ...pre,
        district: result,
      }))
      toast.success('Cập nhật quận/huyện thành công')
    } else {
      toast.error('Cập nhật quận/huyện thất bại')
    }
  }

  const onDelete = async () => {
    const result = await districtService.deleteById(id)
    if (result.is_deleted) {
      navigate('/admin/districts', {
        state: {
          type: 'success',
          message: 'Xóa quận/huyện thành công',
        },
      })
    } else {
      toast.error('Xóa quận/huyện thất bại')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const districtResponse = await districtService.getById(id)
      setData((pre) => ({
        ...pre,
        district: districtResponse,
      }))
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
      <ConfirmModal
        visible={data.showConfirmModal}
        title="Xác nhận"
        content="Bạn có chắc chắn muốn thực hiện hành động này không? Hành động này không thể hoàn tác!"
        confirmText="Xác nhận"
        cancelText="Hủy"
        onConfirm={onDelete}
        onCancel={() => setData((pre) => ({ ...pre, showConfirmModal: false }))}
      />
      <CCardBody>
        <h4 id="ads-spots-title" className="card-title">
          Chi tiết quận/huyện
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
                  defaultValue={data.district.name}
                  {...register('district_name', {
                    required: 'Vui lòng nhập tên quận/huyện',
                  })}
                  feedback={errors.district_name?.message}
                />
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
                  onClick={() => setData((pre) => ({ ...pre, showConfirmModal: true }))}
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
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default DistrictDetails
