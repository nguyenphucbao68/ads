import React, { useEffect, useContext, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { DistrictContext } from 'src/contexts/DistrictProvider'
import * as districtService from 'src/services/district'

function DistrictFilterComponent(props) {
  const { item, applyValue, focusElementRef } = props
  const { districts, dispatchDistricts } = useContext(DistrictContext)

  const districtOptRef = useRef(null)

  React.useImperativeHandle(focusElementRef, () => ({
    focus: () => {
      districtOptRef.current.focus()
    },
  }))

  useEffect(() => {
    const fetchData = async () => {
      const districtsResponse = await districtService.getAll()
      dispatchDistricts({
        type: 'INITIALIZE_DISTRICTS',
        payload: districtsResponse || [],
      })
    }

    fetchData()
  }, [dispatchDistricts])

  const handleFilterChange = useCallback(
    (event) => {
      applyValue({ ...item, value: event.target.value })
    },
    [applyValue, item],
  )

  return (
    <Box
      sx={{
        direction: 'row',
        marginLeft: '10px',
        marginTop: '5px',
      }}
    >
      <select
        className="form-select"
        id="optDistrict"
        name="optDistrict"
        ref={districtOptRef}
        onChange={handleFilterChange}
        defaultValue={item.value}
      >
        <option value={0}>Chọn quận</option>
        {districts.rows?.map((dist) => (
          <option key={dist.id} value={dist.id}>
            {dist.name}
          </option>
        )) || []}
      </select>
    </Box>
  )
}

DistrictFilterComponent.propTypes = {
  item: PropTypes.shape({
    field: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    operator: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
  applyValue: PropTypes.func.isRequired,
  focusElementRef: PropTypes.object.isRequired,
}

export default DistrictFilterComponent
