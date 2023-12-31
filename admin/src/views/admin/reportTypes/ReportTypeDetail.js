import React, { useEffect, useState } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import * as reportTypeService from 'src/services/reportType'
import { useForm } from 'react-hook-form'
import ConfirmModal from 'src/modals/ConfirmModal'

const ReportTypeDetail = () => {
  const { id } = useParams()
  const [data, setData] = useState({})
  const [isModalDisplay, setIsModalDisplay] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, formState, getValues } = useForm()

  /**
   * Fetch data
   */
  const init = async () => {
    let res = await reportTypeService.getById(id)
    setData(res)
  }

  const onSave = async () => {
    try {
      const name = getValues('name')
      await reportTypeService.update(id, { name })

      // Hiển thị thông báo thành công rồi chuyển hướng
      toast.success('Cập nhật loại báo cáo thành công')
      setTimeout(() => navigate(`/admin/report_types`), 1000)
    } catch (err) {
      toast.error('Cập nhật loại báo cáo thất bại')
    }
  }

  const onDelete = async () => {
    try {
      await reportTypeService.deleteById(id)
      navigate(`/admin/report_types`)
    } catch (err) {
      toast.error('Cập nhật loại báo cáo thất bại')
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
        content="Bạn có chắc chắn muốn xoá loại báo cáo này?"
        confirmText="Xác nhận"
        cancelText="Hủy"
        onConfirm={onDelete}
        onCancel={() => setIsModalDisplay(false)}
      />
      <CCardBody>
        <h4 id="report-type-title" className="card-title mb-0">
          Chi tiết loại báo cáo
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
              <CFormLabel htmlFor="reportTypeName" className="col-sm-2 col-form-label">
                Tên
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="name"
                  id="reportTypeName"
                  defaultValue={data.name}
                  {...register('name', {
                    required: 'Vui lòng nhập tên của loại cảnh báo',
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
        </Box>
      </CCardBody>
    </CCard>
  )
}

export default ReportTypeDetail
