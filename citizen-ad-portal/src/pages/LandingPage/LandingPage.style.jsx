import styled from 'styled-components';
import ReactMapGL, { Popup } from '@goongmaps/goong-map-react';
export const Container = styled.div`
  position: relative;
`;

export const StyledReactMapGL = styled(ReactMapGL)`
  .mapboxgl-popup-content {
    padding: 0;
  }
`;

export const StyledPopup = styled(Popup)`
  .mapboxgl-popup-close-button {
    z-index: 2;
    font-size: 20px;
  }

  .mapboxgl-popup-content {
    padding: 15px;
  }
`;
