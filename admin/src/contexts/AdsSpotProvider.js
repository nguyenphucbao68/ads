import React, { useReducer, createContext } from 'react'
import PropTypes from 'prop-types'

export const AdsSpotContext = createContext({
  adsSpots: {},
  dispatchAdsSpots: () => {},
})

const adsSpotReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_ADS_SPOTS': {
      return {
        ...state,
        rows: action.payload,
      }
    }

    case 'TURN_ON_LOADING': {
      return {
        ...state,
        loading: true,
      }
    }

    case 'TURN_OFF_LOADING': {
      return {
        ...state,
        loading: false,
      }
    }

    case 'CHANGE_PAGINATION_MODEL': {
      return {
        ...state,
        page: action.payload.page,
        pageSize: action.payload.pageSize,
      }
    }

    default:
      return state
  }
}

const initialAdsSpot = {
  loading: false,
  rows: [],
  pageSize: 25,
  page: 0,
}

export const AdsSpotProvider = ({ children }) => {
  const [adsSpots, dispatchAdsSpots] = useReducer(adsSpotReducer, initialAdsSpot)

  return (
    <AdsSpotContext.Provider value={{ adsSpots, dispatchAdsSpots }}>
      {children}
    </AdsSpotContext.Provider>
  )
}

AdsSpotProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
