import React, { useContext, useEffect } from 'react'

import PropTypes from 'prop-types'
import { Box, Button, Grid } from '@mui/material'
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import { CFormCheck } from '@coreui/react'
import { WardContext } from 'src/contexts/WardProvider'
import { DistrictContext } from 'src/contexts/DistrictProvider'
import { useForm } from 'react-hook-form'
import * as wardService from 'src/services/ward'
import * as districtService from 'src/services/district'

function CustomGridToolbar({ addNew, filterByWardOrDistrict }) {
  const { register, watch } = useForm({
    defaultValues: {
      type: '',
      district_id: 1,
      ward_id: 1,
    },
  })
  const { wards, dispatchWards } = useContext(WardContext)
  const { districts, dispatchDistricts } = useContext(DistrictContext)

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
    filterByWardOrDistrict && filterByWardOrDistrict(type, wardId, districtId)
  }, [filterByWardOrDistrict, type, wardId, districtId])

  return (
    <GridToolbarContainer>
      {/* Search Textfield here */}
      <Grid container item xs={8} justifyContent="flex-start">
        <GridToolbarQuickFilter />

        {filterByWardOrDistrict && (
          <Box
            sx={{
              direction: 'row',
              marginLeft: '20px',
              marginTop: '10px',
            }}
          >
            <span
              style={{
                fontWeight: 'bold',
              }}
            >
              Lọc theo:
            </span>
          </Box>
        )}

        {filterByWardOrDistrict && (
          <Box
            sx={{
              direction: 'column',
              marginLeft: '10px',
            }}
          >
            <CFormCheck
              type="radio"
              name="inlineRadioOptions"
              id="inlineCheckbox1"
              value="ward"
              label="Phường"
              {...register('type', {
                required: 'Vui lòng chọn loại báo cáo',
              })}
              checked={type === 'ward'}
            />
            <CFormCheck
              type="radio"
              name="inlineRadioOptions"
              id="inlineCheckbox2"
              value="district"
              label="Quận"
              {...register('type', {
                required: 'Vui lòng chọn loại báo cáo',
              })}
              checked={type === 'district'}
            />
          </Box>
        )}
        {filterByWardOrDistrict && type === 'ward' && (
          <Box
            sx={{
              direction: 'row',
              marginLeft: '20px',
            }}
          >
            <select
              className="form-select"
              id="optWard"
              name="optWard"
              style={{
                width: '250px',
              }}
              {...register('ward_id', { required: 'Vui lòng chọn phường' })}
            >
              {wards.rows.map((ward) => (
                <option key={ward.id} value={ward.id}>
                  {ward.name}
                </option>
              ))}
            </select>
          </Box>
        )}
        {filterByWardOrDistrict && type === 'district' && (
          <Box
            sx={{
              direction: 'row',
              marginLeft: '1rem',
            }}
          >
            <select
              className="form-select"
              id="optDistrict"
              name="optDistrict"
              style={{
                width: '250px',
              }}
              {...register('district_id', { required: 'Vui lòng chọn quận' })}
            >
              {districts.rows.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </Box>
        )}
      </Grid>

      <Grid container item xs justifyContent="flex-end">
        {/* default buttons */}
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        {addNew !== null && (
          <Button
            variant="text"
            size="small"
            startIcon={<AddIcon />}
            onClick={(event) => {
              addNew && addNew()
            }}
          >
            Thêm
          </Button>
        )}
        <GridToolbarExport />
      </Grid>
    </GridToolbarContainer>
  )
}

CustomGridToolbar.propTypes = {
  addNew: PropTypes.func || null || undefined,
  filterByWardOrDistrict: PropTypes.func || undefined || null,
}

export default CustomGridToolbar
