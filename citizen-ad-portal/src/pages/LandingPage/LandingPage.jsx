import React, { useCallback, useEffect, useState } from 'react';

import ReactMapGL, {
  Popup,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
  Marker,
} from '@goongmaps/goong-map-react';
import Pin from '../../components/Pin/Pin';

import PinInfo from '../../components/PinInfo/PinInfo';
import AdsPanelList from '../../components/AdsPanelList/AdsPanelList';
import AdsPanelDetail from '../../components/AdsPanelDetail/AdsPanelDetail';
import { Container } from './LandingPage.style';
import axios from 'axios';
import CurrentPin from '../../components/CurrentPin/CurrentPin';
import AdsPanelLocationInfo from '../../components/AdsPanelLocationInfo/AdsPanelLocationInfo';
import { useAdsSpot } from '../../contexts/AdsSpotProvider';
import { useAdsPanelDetail } from '../../contexts/AdsPanelDetailProvider';

const geolocateStyle = {
  top: 0,
  right: 0,
  padding: '10px',
};

const fullscreenControlStyle = {
  top: 36,
  right: 0,
  padding: '10px',
};

const navStyle = {
  top: 72,
  right: 0,
  padding: '10px',
};

const scaleControlStyle = {
  bottom: 36,
  right: 0,
  padding: '10px',
};

function getCursor({ isHovering, isDragging }) {
  console.log({ isHovering, isDragging });
  return isDragging ? 'grabbing' : isHovering ? 'pointer' : 'default';
}

const API_MAP_KEY = process.env.REACT_APP_ADS_MANAGEMENT_MAP_API_KEY;
const API_KEY = process.env.REACT_APP_ADS_MANAGEMENT_API_KEY;
const REVERSE_GEOCODING_PATH = process.env.REACT_APP_REVERSE_GEOCODINNG_URI;

function LandingPage() {
  const [currentMarker, setCurrentMarker] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [adsPanelInfo, setAdsPanelInfo] = useState(null);
  const [adsPanels, setAdsPanel] = useState([]);

  const { adsSpotList } = useAdsSpot();
  const { onClosePanelDetail } = useAdsPanelDetail();

  const [viewport, setViewport] = useState({
    latitude: 10.7769,
    longitude: 106.7009,
    zoom: 16,
    bearing: 0,
    pitch: 0,
  });

  const [popupInfo, setPopupInfo] = useState(null);

  const onClick = useCallback((event) => {
    // const feature = event.features && event.features[0];

    const [lng, lat] = event.lngLat;
    const latlng = `${lat},${lng}`;

    setCurrentMarker({ latitude: lat, longitude: lng });
    setAdsPanelInfo(null);
    axios({
      method: 'get',
      url: `${REVERSE_GEOCODING_PATH}?latlng=${latlng}&api_key=${API_KEY}`,
      responseType: 'json',
    }).then(({ data }) => {
      const { results } = data;
      const filteredResults = results.filter((item) => item.types.length > 0);

      if (filteredResults.length > 0) {
        setLocationInfo(
          filteredResults[Math.floor(Math.random() * filteredResults.length)]
        );
      } else {
        setLocationInfo(results[Math.floor(Math.random() * results.length)]);
      }
    });
  }, []);

  useEffect(() => {
    if (popupInfo) {
      const adsPanelsBySpotUri = `${process.env.REACT_APP_ADS_USER_URI}/${popupInfo.id}/ads-panels`;

      console.log({ popupInfo });
      axios({
        method: 'get',
        url: adsPanelsBySpotUri,
        responseType: 'json',
      })
        .then(({ data }) => {
          setAdsPanel(data.map((item) => ({ ...item, ads_spot: popupInfo })));

          setAdsPanelInfo({ ...popupInfo, adsPanelCount: data.length });

          const [lng, lat] = [popupInfo.longtitude, popupInfo.latitude];
          const latlng = `${lat},${lng}`;
          setCurrentMarker({
            latitude: lat,
            longitude: lng,
          });
          axios({
            method: 'get',
            url: `${REVERSE_GEOCODING_PATH}?latlng=${latlng}&api_key=${API_KEY}`,
            responseType: 'json',
          }).then(({ data }) => {
            const { results } = data;
            const filteredResults = results.filter(
              (item) => item.types.length > 0
            );

            if (filteredResults.length > 0) {
              setLocationInfo(
                filteredResults[
                  Math.floor(Math.random() * filteredResults.length)
                ]
              );
            } else {
              setLocationInfo(
                results[Math.floor(Math.random() * results.length)]
              );
            }
          });
        })
        .catch((e) => {
          console.log(e.toJSON());
        });
    }
    onClosePanelDetail();
  }, [popupInfo]);

  return (
    <Container>
      <AdsPanelDetail />
      {locationInfo && currentMarker && (
        <AdsPanelLocationInfo
          locationDetail={locationInfo}
          adsPanelDetail={adsPanelInfo}
        />
      )}
      <ReactMapGL
        {...viewport}
        width='100vw'
        height='100vh'
        onViewportChange={setViewport}
        goongApiAccessToken={API_MAP_KEY}
        mapStyle={'https://tiles.goong.io/assets/goong_map_web.json'}
        onClick={onClick}
        clickRadius={2}
        getCursor={getCursor}
      >
        {currentMarker && (
          <Marker
            longitude={currentMarker.longitude}
            latitude={currentMarker.latitude}
            offsetTop={-20}
            offsetLeft={-10}
          >
            <CurrentPin size={20} />
          </Marker>
        )}
        <Pin data={adsSpotList} onClick={setPopupInfo} />

        {popupInfo && (
          <React.Fragment>
            <Popup
              tipSize={5}
              anchor='top'
              offsetTop={20}
              offsetLeft={15}
              longitude={popupInfo.longtitude}
              latitude={popupInfo.latitude}
              closeOnClick={false}
              onClose={setPopupInfo}
            >
              <PinInfo info={popupInfo} />
            </Popup>
          </React.Fragment>
        )}

        <GeolocateControl style={geolocateStyle} />
        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </ReactMapGL>
      {popupInfo && <AdsPanelList items={adsPanels} isVisible={popupInfo} />}
    </Container>
  );
}

export default LandingPage;
