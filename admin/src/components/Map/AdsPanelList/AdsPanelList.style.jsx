import { Button } from 'antd'
import styled from 'styled-components'

export const Container = styled.div`
  overflow: auto;
  height: 100vh;
  position: absolute;
  width: 400px;
  /* left: 0px; */
  top: 0;
  transition: left 0.3s ease-in-out;
  padding: 0px 10px;
  background-color: #f0f0f0;
  z-index: 1;
  /* transition: transform 1s ease-in-out;
  transform: translateX(${(props) => (props.isVisible ? '0' : '-100%')}); */
`

export const SideBarToggle = styled(Button)`
  position: absolute;
  top: 50%;
  z-index: 1;
`
