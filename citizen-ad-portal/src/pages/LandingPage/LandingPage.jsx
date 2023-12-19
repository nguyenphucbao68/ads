import React, { useState } from 'react';

import ReactMapGL, {
  Popup,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
} from '@goongmaps/goong-map-react';
import Pin from '../../components/Pin/Pin';

import CITIES from '../../mock/cities.json';

const geolocateStyle = {
  top: 0,
  left: 0,
  padding: '10px',
};

const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: '10px',
};

const navStyle = {
  top: 72,
  left: 0,
  padding: '10px',
};

const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: '10px',
};

function LandingPage() {
  const API_MAP_KEY = 'm4PoRqbbe7SM6IzkpPqSstyQqTPKUrj8EHKEJHGL';

  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
  });

  const [popupInfo, setPopupInfo] = useState(null);

  return (
    <React.Fragment>
      <ReactMapGL
        {...viewport}
        width='100vw'
        height='100vh'
        onViewportChange={setViewport}
        goongApiAccessToken={API_MAP_KEY}
        mapStyle={'https://tiles.goong.io/assets/goong_map_web.json'}
      >
        <Pin data={CITIES} onClick={setPopupInfo} />

        {popupInfo && (
          <Popup
            tipSize={5}
            anchor='top'
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeOnClick={false}
            onClose={setPopupInfo}
          ></Popup>
        )}

        <GeolocateControl style={geolocateStyle} />
        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </ReactMapGL>
    </React.Fragment>
  );

  return (
    <ReactMapGL
      {...viewport}
      width='100vw'
      height='100vh'
      mapStyle='https://tiles.goong.io/assets/goong_map_dark.json'
      onViewportChange={(e) => setViewport({ ...e })}
      goongApiAccessToken={API_MAP_KEY}
    />
  );
}

export default LandingPage;
