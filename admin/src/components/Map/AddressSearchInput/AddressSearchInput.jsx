import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { AutoComplete } from 'antd'
import axios from 'axios'

function AddressSearchInput({ onSelectAddress }) {
  const [options, setOptions] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    if (input !== '') {
      const timeId = setTimeout(() => {
        axios({
          method: 'get',
          url: `${process.env.REACT_APP_PLACES_API}/AutoComplete?api_key=${process.env.REACT_APP_ADS_MANAGEMENT_API_KEY}&input=${input}`,
          responseType: 'json',
        }).then(({ data }) => {
          const res = data.predictions.map((item, id) => ({
            id,
            value: item.description,
            placeId: item.place_id,
          }))
          setOptions(res)
        })
      }, 1000)

      return () => clearTimeout(timeId)
    }
  }, [input])

  const onSelect = (data) => {
    const filteredData = options.filter((item) => item.value === data)

    onSelectAddress(filteredData[0].placeId)
    setInput(data)
  }

  return (
    <AutoComplete
      style={{
        width: 400,
        height: 50,
        zIndex: 2,
        position: 'absolute',
        top: 20,
        left: 10,
      }}
      onSearch={(value) => setInput(value)}
      onSelect={onSelect}
      placeholder="Nhập địa chỉ tìm kiếm"
      value={input}
      options={options}
    />
  )
}

AddressSearchInput.propTypes = {
  onSelectAddress: PropTypes.func,
}

export default AddressSearchInput
