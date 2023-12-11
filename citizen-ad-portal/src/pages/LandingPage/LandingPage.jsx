import React, { useState } from 'react';

import ReactMapGL from '@goongmaps/goong-map-react';

function LandingPage() {
  const API_MAP_KEY = 'm4PoRqbbe7SM6IzkpPqSstyQqTPKUrj8EHKEJHGL';

  const [viewport, setViewport] = useState({
    longitude: 105.85119,
    latitude: 21.02727,
    zoom: 8,
  });

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
