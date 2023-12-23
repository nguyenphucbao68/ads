import React, { useReducer, createContext } from 'react'
import PropTypes from 'prop-types'

export const AdsPanelContext = createContext({
  adsPanels: {
    loading: false,
    rows: [],
    pageSize: 25,
    page: 0,
  },
  dispatchAdsPanels: () => {},
})

const adsPanelReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_ADS_PANELS': {
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

const initialAdsPanel = {
  loading: false,
  rows: [],
  pageSize: 25,
  page: 0,
}

export const AdsPanelProvider = ({ children }) => {
  const [adsPanels, dispatchAdsPanels] = useReducer(adsPanelReducer, initialAdsPanel)

  return (
    <AdsPanelContext.Provider value={{ adsPanels, dispatchAdsPanels }}>
      {children}
    </AdsPanelContext.Provider>
  )
}

AdsPanelProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
