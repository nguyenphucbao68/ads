import React from 'react';
import { Marker } from '@goongmaps/goong-map-react';

// const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
//   c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
//   C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 12;

function Pin({ data, onClick, colorFill }) {
  if (!data) return <></>;

  return (
    <Marker longitude={data.longtitude} latitude={data.latitude}>
      <svg
        width='40'
        height='40'
        xmlns='http://www.w3.org/2000/svg'
        onClick={() => onClick({ ...data })}
        style={{
          transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
          cursor: 'pointer',
        }}
      >
        <circle
          cx='20'
          cy='20'
          r={SIZE}
          stroke='black'
          strokeWidth='2'
          fill={colorFill}
        />

        <text
          x='50%'
          y='50%'
          dominantBaseline='middle'
          textAnchor='middle'
          fontSize='10'
          fill='white'
        >
          QC
        </text>
      </svg>
    </Marker>
  );
}

export default React.memo(Pin);
