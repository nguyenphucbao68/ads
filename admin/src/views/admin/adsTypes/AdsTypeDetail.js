import React, { useState, useEffect } from 'react'

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
import { useForm } from 'react-hook-form'
import { Toaster, toast } from 'sonner'
import ConfirmModal from 'src/modals/ConfirmModal'
import { useNavigate } from 'react-router-dom'
import * as adsTypeService from 'src/services/adsType'

const AdsTypeDetail = () => {
  const { id } = useParams()
  const [data, setData] = useState({})
  const navigate = useNavigate()
  const [isModalDisplay, setIsModalDisplay] = useState(false)

  const { register, handleSubmit, formState, getValues } = useForm()

  // TODO sử dụng reducer
  const init = async () => {
    let data = await adsTypeService.getById(id)
    setData(data)
  }

  // Hàm thay đổi
  const onSave = async () => {
    try {
      const name = getValues('name')
      await adsTypeService.update(id, { name })

      // Hiển thị thông báo thành công rồi chuyển hướng
      toast.success('Cập nhật loại hình quảng cáo thành công')
      setTimeout(() => navigate(`/admin/ads_types`), 1000)
    } catch (err) {
      toast.error('Cập nhật loại hình quảng cáo thất bại')
    }
  }

  // Hàm xóa
  const onDelete = async () => {
    try {
      await adsTypeService.deleteById(id)
      navigate(`/admin/ads_types`)
    } catch (err) {
      toast.error('Cập nhật loại bảng quảng cáo thất bại')
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <CCard className="mb-4">
      <Toaster position="top-right" reverseOrder={false} />
      <ConfirmModal
        visible={isModalDisplay}
        title="Xác nhận"
        content="Bạn có chắc chắn muốn xoá loại hình quảng cáo này?"
        confirmText="Xác nhận"
        cancelText="Hủy"
        onConfirm={onDelete}
        onCancel={() => setIsModalDisplay(false)}
      />
      <CCardBody>
        <h4 id="ads-spots-title" className="card-title mb-0">
          Chi tiết điểm đặt quảng cáo
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
                  defaultValue={data.name}
                  {...register('name', {
                    required: 'Vui lòng nhập tên loại hình quảng cáo',
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
                  variant="contained"
                  startIcon={<SaveIcon />}
                  color="primary"
                  sx={{
                    borderRadius: '8px',
                  }}
                  disabled={!formState.isDirty}
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
                  onClick={() => setIsModalDisplay(true)}
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

export default AdsTypeDetail
