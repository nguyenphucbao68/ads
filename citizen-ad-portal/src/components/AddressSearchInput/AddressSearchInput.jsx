import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'antd';
import axios from 'axios';
function AddressSearchInput({ onSelectAddress }) {
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (input !== '') {
      const timeId = setTimeout(() => {
        axios({
          method: 'get',
          url: `${process.env.REACT_APP_PLACES_API}/AutoComplete?api_key=${process.env.REACT_APP_ADS_MANAGEMENT_API_KEY}&input=${input}`,
          responseType: 'json',
        }).then(({ data }) => {
          console.log({
            data: data.predictions.map((item) => item.description),
          });
          const res = data.predictions.map((item, id) => ({
            id,
            value: item.description,
            placeId: item.place_id,
          }));
          setOptions(res);
        });
      }, 1000);

      return () => clearTimeout(timeId);
    }
  }, [input]);

  const onSelect = (data) => {
    const filteredData = options.filter((item) => item.value === data);

    console.log({ filteredData });
    onSelectAddress(filteredData[0].placeId);
    setInput(data);
  };

  return (
    <AutoComplete
      style={{ width: 200, zIndex: 2, position: 'fixed', left: '300' }}
      onSearch={(value) => setInput(value)}
      onSelect={onSelect}
      placeholder='input here'
      value={input}
      options={options}
    />
  );
}

export default AddressSearchInput;
