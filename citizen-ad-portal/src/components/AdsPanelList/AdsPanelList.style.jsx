import styled from 'styled-components';

export const Container = styled.div`
  overflow: auto;
  height: 100vh;
  width: 320px;
  position: fixed;
  left: 0;
  top: 0;
  padding: 10px;
  background-color: #f0f0f0;
  z-index: 2;
  transition: transform 1s ease-in-out;
  transform: translateX(${(props) => (props.isVisible ? '0' : '-100%')});
`;
