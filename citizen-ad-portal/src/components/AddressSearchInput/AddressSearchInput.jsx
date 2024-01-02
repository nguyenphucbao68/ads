import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'antd';
import axios from 'axios';
function AddressSearchInput() {
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (input !== '') {
      const timeId = setTimeout(() => {
        axios({
          method: 'get',
          url: `${process.env.REACT_APP_PLACES_AUTOCOMPLETE_API}?api_key=${process.env.REACT_APP_ADS_MANAGEMENT_API_KEY}&input=${input}`,
          responseType: 'json',
        }).then(({ data }) => {
          console.log({
            data: data.predictions.map((item) => item.description),
          });
          const res = data.predictions.map((item) => ({
            value: item.description,
          }));
          setOptions(res);
          // console.log({ data: data.map((item) => item.descriptionn) });
        });
      }, 1000);

      return () => clearTimeout(timeId);
    }
  }, [input]);

  const onSelect = (data) => {
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
