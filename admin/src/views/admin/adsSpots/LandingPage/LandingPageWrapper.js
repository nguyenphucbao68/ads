import React, { useState } from 'react'
import LandingPage from './LandingPage'

function LandingPageWrapper() {
  const [currentMarker, setCurrentMarker] = useState(null)

  return (
    <div
      style={{
        width: '100vh',
        height: '100vh',
        marginLeft: '-100px',
      }}
    >
      <LandingPage
        height="80vh"
        width="80vw"
        currentMarker={currentMarker}
        setCurrentMarker={setCurrentMarker}
        onChangeNewAddress={() => {}}
      />
    </div>
  )
}

export default LandingPageWrapper
