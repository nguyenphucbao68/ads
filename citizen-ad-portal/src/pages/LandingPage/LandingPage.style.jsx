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
  button .mapboxgl-popup-close-button {
    z-index: 2;
    font-size: 24;
  }
`;

export const StyledCircle = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #00ff00; /* Màu xanh */
  border: 1px solid #000000; /* Border màu đen, width 1px */
  color: #000000; /* Màu chữ màu đen */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  z-index: 2;
`;
