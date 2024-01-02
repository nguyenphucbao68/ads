import React, { useCallback, useEffect, useRef, useState } from 'react';

import ReactMapGL, {
  Popup,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
  Marker,
  FlyToInterpolator,
  Source,
  Layer,
} from '@goongmaps/goong-map-react';
import Pin from '../../components/Pin/Pin';
import { StyledPopup, StyledReactMapGL } from './LandingPage.style';

import PinInfo from '../../components/PinInfo/PinInfo';
import AdsPanelList from '../../components/AdsPanelList/AdsPanelList';
import AdsPanelDetail from '../../components/AdsPanelDetail/AdsPanelDetail';
import { Container } from './LandingPage.style';
import axios from 'axios';
import CurrentPin from '../../components/CurrentPin/CurrentPin';
import AdsPanelLocationInfo from '../../components/AdsPanelLocationInfo/AdsPanelLocationInfo';
import { useAdsSpot } from '../../contexts/AdsSpotProvider';
import { useAdsPanelDetail } from '../../contexts/AdsPanelDetailProvider';
import AddressSearchInput from '../../components/AddressSearchInput/AddressSearchInput';
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from './layers';

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
  const mapRef = useRef(null);

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
    const feature = event.features[0];
    console.log({ feature });
    // const clusterId = feature.properties.cluster_id;

    // const mapboxSource = mapRef.current.getMap().getSource('earthquakes');

    // mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
    //   if (err) {
    //     return;
    //   }

    //   setViewport({
    //     ...viewport,
    //     longitude: feature.geometry.coordinates[0],
    //     latitude: feature.geometry.coordinates[1],
    //     zoom,
    //     transitionDuration: 500,
    //   });
    // });

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

  const onSelectAddress = useCallback((placeId) => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_PLACES_API}/Detail?api_key=${process.env.REACT_APP_ADS_MANAGEMENT_API_KEY}&place_id=${placeId}`,
      responseType: 'json',
    })
      .then(({ data }) => {
        const location = data.result.geometry.location;

        console.log({ location });

        const { lng: longitude, lat: latitude } = location;

        setViewport({
          longitude: location.lng,
          latitude: location.lat,
          zoom: 16,
          transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
          transitionDuration: 'auto',
        });
        setCurrentMarker({ longitude, latitude });
      })
      .catch((e) => {
        console.log({ error: e.toJSON() });
      });
  }, []);

  useEffect(() => {
    console.log({ viewport });
  }, [viewport]);

  const clusterData = {
    type: 'FeatureCollection',
    crs: {
      type: 'name',
      properties: {
        name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
      },
    },
    features: adsSpotList.map((item) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [item.longtitude, item.latitude],
      },
    })),
  };

  console.log({ clusterData });

  return (
    <Container>
      <AdsPanelDetail />
      <AddressSearchInput onSelectAddress={onSelectAddress} />
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
        ref={mapRef}
      >
        <Source
          id='earthquakes'
          type='geojson'
          data={clusterData}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
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
            <StyledPopup
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
            </StyledPopup>
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
