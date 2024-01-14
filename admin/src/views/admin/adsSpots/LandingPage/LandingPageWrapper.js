import React, { useState } from 'react'
import LandingPage from './LandingPage'
import { CCard } from '@coreui/react'

function LandingPageWrapper() {
  const [currentMarker, setCurrentMarker] = useState(null)

  return (
    <CCard
      className="mb-4"
      sx={{
        backgroundColor: '#fff',
      }}
    >
      <LandingPage
        height="80vh"
        width="100%"
        currentMarker={currentMarker}
        setCurrentMarker={setCurrentMarker}
        onChangeNewAddress={() => {}}
      />
    </CCard>
  )
}

export default LandingPageWrapper
