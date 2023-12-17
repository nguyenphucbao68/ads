import React, { useReducer, createContext } from 'react'
import PropTypes from 'prop-types'

export const SpotTypeContext = createContext({
  spotTypes: {
    loading: false,
    rows: [],
    pageSize: 25,
    page: 0,
  },
  dispatchSpotTypes: () => {},
})

const spotTypeReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_SPOT_TYPES': {
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

const initialSpotType = {
  loading: false,
  rows: [],
  pageSize: 25,
  page: 0,
}

export const SpotTypeProvider = ({ children }) => {
  const [spotTypes, dispatchSpotTypes] = useReducer(spotTypeReducer, initialSpotType)

  return (
    <SpotTypeContext.Provider value={{ spotTypes, dispatchSpotTypes }}>
      {children}
    </SpotTypeContext.Provider>
  )
}

SpotTypeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
