import { Marker } from '@goongmaps/goong-map-react';
import React from 'react';

function WarningMarker({ lng, lat, onClick }) {
  return (
    <Marker longitude={lng} latitude={lat}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        enable-background='new 0 0 47.5 47.5'
        viewBox='0 0 47.5 47.5'
        width={20}
        // height={40}
        id='warning'
        onClick={onClick}
      >
        <defs>
          <clipPath id='a'>
            <path d='M0 38h38V0H0v38Z'></path>
          </clipPath>
        </defs>
        <g clip-path='url(#a)' transform='matrix(1.25 0 0 -1.25 0 47.5)'>
          <path
            fill='#ffcc4d'
            d='M0 0c-1.842 0-2.654 1.338-1.806 2.973l15.609 30.055c.848 1.635 2.238 1.635 3.087 0L32.499 2.973C33.349 1.338 32.536 0 30.693 0H0Z'
            transform='translate(3.653 2)'
          ></path>
          <path
            fill='#231f20'
            d='M0 0c0 1.302.961 2.108 2.232 2.108 1.241 0 2.233-.837 2.233-2.108v-11.938c0-1.271-.992-2.108-2.233-2.108-1.271 0-2.232.807-2.232 2.108V0Zm-.187-18.293a2.422 2.422 0 0 0 2.419 2.418 2.422 2.422 0 0 0 2.419-2.418 2.422 2.422 0 0 0-2.419-2.419 2.422 2.422 0 0 0-2.419 2.419'
            transform='translate(16.769 26.34)'
          ></path>
        </g>
      </svg>
    </Marker>
  );
}

export default WarningMarker;
