import React, { useEffect, useState } from 'react'

import { Box, Button, Grid } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react'
import { useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as reportTypeService from 'src/services/reportType'

const ReportTypeCreate = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState, getValues } = useForm()

  /**
   *
   */
  const onSave = async () => {
    const name = getValues('name')
    await reportTypeService.create({ name })

    navigate('/admin/report_types')
  }

  return (
    <CCard className="mb-4">
      <CCardBody>
        <h4 id="report-type-title" className="card-title mb-0">
          Chi tiết loại báo cáo
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
              <CFormLabel htmlFor="reportTypeName" className="col-sm-2 col-form-label">
                Tên
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  type="text"
                  id="reportTypeName"
                  placeholder="Nhập tên của loại báo báo"
                  {...register('name', {
                    required: 'Vui lòng nhập tên của loại báo báo',
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
              ></Grid>
            </Grid>
          </Box>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default ReportTypeCreate
