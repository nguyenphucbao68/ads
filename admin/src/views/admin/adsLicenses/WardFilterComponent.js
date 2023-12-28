import React, { useEffect, useContext, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { WardContext } from 'src/contexts/WardProvider'
import * as wardService from 'src/services/ward'
import { Box } from '@mui/material'

function WardFilterComponent(props) {
  const { item, applyValue, focusElementRef } = props
  const { wards, dispatchWards } = useContext(WardContext)

  const wardOptRef = useRef(null)
  React.useImperativeHandle(focusElementRef, () => ({
    focus: () => {
      wardOptRef.current.focus()
    },
  }))

  useEffect(() => {
    const fetchData = async () => {
      const wardsResponse = await wardService.getAll()
      dispatchWards({
        type: 'INITIALIZE_WARDS',
        payload: wardsResponse || [],
      })
    }

    fetchData()
  }, [dispatchWards])

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
        id="optWard"
        name="optWard"
        ref={wardOptRef}
        onChange={handleFilterChange}
        defaultValue={item.value}
      >
        <option value={0}>Chọn phường</option>
        {wards.rows?.map((ward) => (
          <option key={ward.id} value={ward.id}>
            {ward.name}
          </option>
        )) || []}
      </select>
    </Box>
  )
}

WardFilterComponent.propTypes = {
  item: PropTypes.shape({
    field: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    operator: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired,
  applyValue: PropTypes.func.isRequired,
  focusElementRef: PropTypes.object.isRequired,
}

export default WardFilterComponent
