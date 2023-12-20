import React, { useEffect, useState } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { Toaster, toast } from 'sonner'
import ConfirmModal from 'src/modals/ConfirmModal'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as adsPanelService from 'src/services/adsPanel'
// TODO
const AdsPanelDetail = () => {
  const { id } = useParams()
  const [data, setData] = useState({})
  const [isModalDisplay, setIsModalDisplay] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, formState, getValues } = useForm()

  // Fetch data
  const init = async () => {
    let data = await adsPanelService.getById(id)
    setData(data)
  }

  // Hàm thay đổi
  // TODO viết lại

  const onSave = async () => {
    try {
      const name = getValues('name')
      await adsPanelService.update(id, { name })

      // Hiển thị thông báo thành công rồi chuyển hướng
      toast.success('Cập nhật bảng quảng cáo thành công')
      setTimeout(() => navigate(`/admin/ads-panels`), 1000)
    } catch (err) {
      toast.error('Cập nhật bảng quảng cáo thất bại')
    }
  }

  // Hàm xóa
  const onDelete = async () => {
    try {
      await adsPanelService.deleteById(id)
      navigate(`/admin/ads-panels`)
    } catch (err) {
      toast.error('Cập nhật bảng quảng cáo thất bại')
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
        content="Bạn có chắc chắn muốn xoá loại bảng quảng cáo này?"
        confirmText="Xác nhận"
        cancelText="Hủy"
        onConfirm={onDelete}
        onCancel={() => setIsModalDisplay(false)}
      />
      <CCardBody>
        <h4 id="ads-panel-type-title" className="card-title mb-0">
          Chi tiết bảng quảng cáo
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
              <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                Loại
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="number" id="inputEmail3" defaultValue={data.ads_type_id} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="height" className="col-sm-2 col-form-label">
                Chiều cao
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" id="height" defaultValue={data.height} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="width" className="col-sm-2 col-form-label">
                Chiều rộng
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" id="width" defaultValue={data.width} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="expire_date" className="col-sm-2 col-form-label">
                Ngày hết hạn
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" id="expire_date" defaultValue={data.expire_date} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="image" className="col-sm-2 col-form-label">
                Hình ảnh
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" id="image" defaultValue={data.image} />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="spot_id" className="col-sm-2 col-form-label">
                Điểm đặt tại đây
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput type="text" id="spot_id" defaultValue={data.ads_spot_id} />
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
                    variant="contained"
                    startIcon={<SaveIcon />}
                    color="success"
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
        </Box>
      </CCardBody>
    </CCard>
  )
}

export default AdsPanelDetail
