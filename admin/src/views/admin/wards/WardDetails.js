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
import * as wardService from 'src/services/ward'
import * as districtService from 'src/services/district'
import ConfirmModal from 'src/modals/ConfirmModal'

const WardDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { districts, dispatchDistricts } = useContext(DistrictContext)
  const [data, setData] = useState({
    showConfirmModal: false,
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
  } = useForm({
    values: {
      ward_name: data.ward.name,
      district_id: data.ward.district.id,
    },
  })

  const onSubmit = async (data) => {
    const result = await wardService.update(id, {
      name: data.ward_name,
      district_id: parseInt(data.district_id, 10),
    })
    if (result.id) {
      setData((pre) => ({
        ...pre,
        ward: result,
      }))
      toast.success('Cập nhật phường/xã thành công')
    } else {
      toast.error('Cập nhật phường/xã thất bại')
    }
  }

  const onDelete = async () => {
    const result = await wardService.deleteById(id)
    if (result.is_deleted) {
      navigate('/admin/wards', {
        state: {
          type: 'success',
          message: 'Xóa phường/xã thành công',
        },
      })
    } else {
      toast.error('Xóa phường/xã thất bại')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const districtsResponse = await districtService.getAll()
      dispatchDistricts({
        type: 'INITIALIZE_DISTRICTS',
        payload: districtsResponse || [],
      })

      const wardResponse = await wardService.getById(id)
      setData((pre) => ({
        ...pre,
        ward: wardResponse,
      }))
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
          Chi tiết phường/xã
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
                      value={district.id}
                      selected={district.id === data.ward.district.id}
                    >
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

export default WardDetails
