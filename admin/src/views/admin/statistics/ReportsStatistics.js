import React, { useEffect, useContext, useState } from 'react'

import { Typography, Box } from '@mui/material'
import { CCard, CCardBody, CForm, CCol, CRow, CFormLabel, CFormCheck } from '@coreui/react'
import { useForm } from 'react-hook-form'
import { DistrictContext } from 'src/contexts/DistrictProvider'
import * as wardService from 'src/services/ward'
import * as districtService from 'src/services/district'
import { getStyle } from '@coreui/utils'
import { CChart } from '@coreui/react-chartjs'
import { WardContext } from 'src/contexts/WardProvider'
import { getReportsStatistics } from 'src/services/statistic'

const ReportStatistics = () => {
  const { register, watch } = useForm({
    defaultValues: {
      type: 'ward',
      district_id: 1,
      ward_id: 1,
    },
  })
  const { wards, dispatchWards } = useContext(WardContext)
  const { districts, dispatchDistricts } = useContext(DistrictContext)
  const [data, setData] = useState({
    labels: ['Chưa xử lý', 'Đã duyệt', 'Không phê duyệt'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
        data: [0, 0, 0],
      },
    ],
  })

  const type = watch('type')
  const wardId = watch('ward_id')
  const districtId = watch('district_id')

  useEffect(() => {
    const fetchData = async () => {
      const districtsResponse = await districtService.getAll()
      dispatchDistricts({
        type: 'INITIALIZE_DISTRICTS',
        payload: districtsResponse || [],
      })

      const wardsResponse = await wardService.getAll()
      dispatchWards({
        type: 'INITIALIZE_WARDS',
        payload: wardsResponse || [],
      })
    }

    fetchData()
  }, [dispatchDistricts, dispatchWards])

  useEffect(() => {
    const fetchData = async () => {
      let queryString = `?type=${type}`

      if (type === 'ward') {
        queryString += `&ward_id=${wardId}`
      } else {
        queryString += `&district_id=${districtId}`
      }

      const response = await getReportsStatistics(queryString)
      setData(response)
    }

    fetchData()
  }, [type, wardId, districtId])

  return (
    <CCard
      className="mb-4"
      sx={{
        backgroundColor: '#fff',
      }}
    >
      <CForm>
        <CCardBody>
          <h4 id="ads-spots-title" className="card-title">
            Thống kê cách thức xử lý báo cáo
          </h4>
          <hr />
          <Box
            sx={{
              height: 'calc(100vh - 480px)',
              width: '500px',
              margin: 'auto',
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            <CChart
              type="doughnut"
              data={data}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: getStyle('--cui-body-color'),
                    },
                  },
                },
              }}
            />
          </Box>
          <Box
            sx={{
              margin: 'auto',
              width: '500px',
            }}
          >
            <Typography
              sx={{
                marginTop: '20px',
                marginBottom: '10px',
                fontWeight: 'bold',
              }}
            >
              Lọc theo:
            </Typography>
            <CFormCheck
              inline
              type="radio"
              name="inlineRadioOptions"
              id="inlineCheckbox1"
              value="ward"
              label="Phường"
              {...register('type', {
                required: 'Vui lòng chọn loại báo cáo',
              })}
            />
            <CFormCheck
              inline
              type="radio"
              name="inlineRadioOptions"
              id="inlineCheckbox2"
              value="district"
              label="Quận"
              {...register('type', {
                required: 'Vui lòng chọn loại báo cáo',
              })}
            />
            {type === 'ward' && (
              <CRow className="mb-3 mt-3">
                <CFormLabel htmlFor="optWard" className="col-sm-2 col-form-label">
                  Phường
                </CFormLabel>
                <CCol sm={10}>
                  <select
                    className="form-select"
                    id="optWard"
                    name="optWard"
                    {...register('ward_id', { required: 'Vui lòng chọn phường' })}
                  >
                    {wards.rows.map((ward) => (
                      <option key={ward.id} value={ward.id}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                </CCol>
              </CRow>
            )}
            {type === 'district' && (
              <CRow className="mb-3 mt-3">
                <CFormLabel htmlFor="optDistrict" className="col-sm-2 col-form-label">
                  Quận
                </CFormLabel>
                <CCol sm={10}>
                  <select
                    className="form-select"
                    id="optDistrict"
                    name="optDistrict"
                    {...register('district_id', { required: 'Vui lòng chọn quận' })}
                  >
                    {districts.rows.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </CCol>
              </CRow>
            )}
          </Box>
        </CCardBody>
      </CForm>
    </CCard>
  )
}

export default ReportStatistics
