import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'antd';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import { Container } from './AddressSearchInput.style';
function AddressSearchInput({ onSelectAddress, isBackgroundDisplay }) {
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

  console.log({ isBackgroundDisplay });

  return (
    <Container
      style={{
        backgroundColor: isBackgroundDisplay ? '#F0F0F0' : null,
      }}
    >
      <AutoComplete
        style={{
          width: '375px',
          height: '40px',
        }}
        onSearch={(value) => setInput(value)}
        onSelect={onSelect}
        placeholder='Tìm kiếm địa chỉ'
        value={input}
        suffixIcon={<SearchOutlined size={'large'} />}
        options={options}
      />
    </Container>
  );
}

export default React.memo(AddressSearchInput);
