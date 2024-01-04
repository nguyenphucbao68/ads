import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import ReactMapGL, {
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
  Marker,
  FlyToInterpolator,
} from '@goongmaps/goong-map-react'
import axios from 'axios'

// import Pin from '../../components/Pin/Pin'
import { StyledPopup, Container } from './LandingPage.style'
import Pin from 'src/components/Map/Pin/Pin'
import PinInfo from 'src/components/Map/PinInfo/PinInfo'
import AdsPanelList from 'src/components/Map/AdsPanelList/AdsPanelList'
import AdsPanelDetail from 'src/components/Map/AdsPanelDetail/AdsPanelDetail'
import CurrentPin from 'src/components/Map/CurrentPin/CurrentPin'
import AdsPanelLocationInfo from 'src/components/Map/AdsPanelLocationInfo/AdsPanelLocationInfo'
import AddressSearchInput from 'src/components/Map/AddressSearchInput/AddressSearchInput'
import * as adsSpotService from 'src/services/adsSpot'
import { useParams } from 'react-router-dom'

const geolocateStyle = {
  top: 0,
  right: 0,
  padding: '10px',
}

const fullscreenControlStyle = {
  top: 36,
  right: 0,
  padding: '10px',
}

const navStyle = {
  top: 72,
  right: 0,
  padding: '10px',
}

const scaleControlStyle = {
  bottom: 36,
  right: 0,
  padding: '10px',
}

function getCursor({ isHovering, isDragging }) {
  return isDragging ? 'grabbing' : isHovering ? 'pointer' : 'default'
}

const API_MAP_KEY = process.env.REACT_APP_ADS_MANAGEMENT_MAP_API_KEY
const API_KEY = process.env.REACT_APP_ADS_MANAGEMENT_API_KEY
const REVERSE_GEOCODING_PATH = process.env.REACT_APP_REVERSE_GEOCODINNG_URI

function LandingPage({ width, height, onChangeNewAddress, currentMarker, setCurrentMarker }) {
  const { id } = useParams()

  // const [currentMarker, setCurrentMarker] = useState(null)
  const [locationInfo, setLocationInfo] = useState(null)
  const [adsPanelInfo, setAdsPanelInfo] = useState(null)
  const [adsPanels, setAdsPanel] = useState([])

  const [adsSpots, setAdsSpots] = useState([])

  const [adsPanelDetail, setAdsPanelDetail] = useState(null)

  const onShowPanelDetail = (adsPanelItem) => {
    setAdsPanelDetail({
      ...adsPanelItem,
    })
  }

  const onClosePanelDetail = () => {
    setAdsPanelDetail(null)
  }

  const [viewport, setViewport] = useState({
    latitude: 10.7769,
    longitude: 106.7009,
    zoom: 16,
    bearing: 0,
    pitch: 0,
  })

  const [popupInfo, setPopupInfo] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const adsSpot = await adsSpotService.getAll()
      setAdsSpots(adsSpot)

      const findAdsSpot = adsSpot.find((item) => item.id === Number(id))

      if (findAdsSpot) {
        setViewport({
          ...viewport,
          latitude: findAdsSpot.latitude,
          longitude: findAdsSpot.longtitude,
        })
      } else {
        if (adsSpot.length > 0)
          setViewport({
            ...viewport,
            latitude: adsSpot[0].latitude,
            longitude: adsSpot[0].longtitude,
          })
      }
    }

    fetchData()
  }, [])

  const onClick = useCallback((event) => {
    const [lng, lat] = event.lngLat
    const latlng = `${lat},${lng}`

    setCurrentMarker({ latitude: lat, longitude: lng })
    setAdsPanelInfo(null)
    axios({
      method: 'get',
      url: `${REVERSE_GEOCODING_PATH}?latlng=${latlng}&api_key=${API_KEY}`,
      responseType: 'json',
    }).then(({ data }) => {
      const { results } = data
      const filteredResults = results.filter((item) => item.address_components.length >= 4)

      if (filteredResults.length > 0) {
        setLocationInfo(filteredResults[0])
        const length = filteredResults[0].address_components.length
        const formattedAddress = filteredResults[0].address_components
          .slice(0, length - 3)
          .map((item) => item.long_name)
          .join(', ')
        onChangeNewAddress({
          address: formattedAddress,
          ward: 'Phường ' + filteredResults[0].compound.commune,
          district: filteredResults[0].compound.district,
          long: lng,
          lat,
        })
      } else {
        setLocationInfo(results[0])
        const length = results[0].address_components.length
        const formattedAddress = results[0].address_components
          .slice(0, length - 3)
          .map((item) => item.long_name)
          .join(', ')
        onChangeNewAddress({
          address: formattedAddress,
          ward: 'Phường ' + results[0].compound.commune,
          district: results[0].compound.district,

          long: lng,
          lat,
        })
      }
    })
  }, [])

  useEffect(() => {
    const popUpInfoFunc = async () => {
      if (popupInfo) {
        // const adsPanelsBySpotUri = `${process.env.REACT_APP_ADS_SPOTS_URI}/${popupInfo.id}/ads-panels`

        console.log({ popupInfo })

        const adsPanels = await adsSpotService.getAllAdsPanelByAdsSpotId(popupInfo.id)

        setAdsPanel(adsPanels.map((item) => ({ ...item, ads_spot: popupInfo })))

        setAdsPanelInfo({ ...popupInfo, adsPanelCount: adsPanels.length })

        const [lng, lat] = [popupInfo.longtitude, popupInfo.latitude]
        const latlng = `${lat},${lng}`
        setCurrentMarker({
          latitude: lat,
          longitude: lng,
        })
        axios({
          method: 'get',
          url: `${REVERSE_GEOCODING_PATH}?latlng=${latlng}&api_key=${API_KEY}`,
          responseType: 'json',
        }).then(({ data }) => {
          const { results } = data
          const filteredResults = results.filter((item) => item.address_components.length >= 4)

          if (filteredResults.length > 0) {
            setLocationInfo(filteredResults[0])
            const length = filteredResults[0].address_components.length
            const formattedAddress = filteredResults[0].address_components
              .slice(0, length - 3)
              .map((item) => item.long_name)
              .join(', ')
            onChangeNewAddress({
              address: formattedAddress,
              ward: 'Phường ' + filteredResults[0].compound.commune,
              district: filteredResults[0].compound.district,
              long: lng,
              lat,
            })
          } else {
            setLocationInfo(results[0])
            const length = results[0].address_components.length
            const formattedAddress = results[0].address_components
              .slice(0, length - 3)
              .map((item) => item.long_name)
              .join(', ')
            onChangeNewAddress({
              address: formattedAddress,
              ward: 'Phường ' + results[0].compound.commune,
              district: results[0].compound.district,
              long: lng,
              lat,
            })
          }
        })
      }
      onClosePanelDetail()
    }

    popUpInfoFunc()
  }, [popupInfo])

  const onSelectAddress = useCallback((placeId) => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_PLACES_API}/Detail?api_key=${process.env.REACT_APP_ADS_MANAGEMENT_API_KEY}&place_id=${placeId}`,
      responseType: 'json',
    })
      .then(({ data }) => {
        const location = data.result.geometry.location

        console.log({ location })

        const { lng: longitude, lat: latitude } = location

        setViewport({
          longitude: location.lng,
          latitude: location.lat,
          zoom: 16,
          transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
          transitionDuration: 'auto',
        })
        setCurrentMarker({ longitude, latitude })
      })
      .catch((e) => {
        console.log({ error: e.toJSON() })
      })
  }, [])

  return (
    <Container>
      <ReactMapGL
        {...viewport}
        width={width}
        height={height}
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
        <AddressSearchInput onSelectAddress={onSelectAddress} />
        <Pin data={adsSpots} onClick={setPopupInfo} />
        <AdsPanelDetail adsPanelDetail={adsPanelDetail} onClosePanelDetail={onClosePanelDetail} />
        {popupInfo && (
          <AdsPanelList
            items={adsPanels}
            isVisible={popupInfo}
            onShowPanelDetail={onShowPanelDetail}
          />
        )}
        {locationInfo && currentMarker && (
          <AdsPanelLocationInfo locationDetail={locationInfo} adsPanelDetail={adsPanelInfo} />
        )}
        {popupInfo && (
          <React.Fragment>
            <StyledPopup
              tipSize={5}
              anchor="top"
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
    </Container>
  )
}

LandingPage.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  onChangeNewAddress: PropTypes.func,
  currentMarker: PropTypes.object,
  setCurrentMarker: PropTypes.func,
}

export default LandingPage
