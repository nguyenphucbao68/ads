import styled from 'styled-components';
import { Form } from 'antd';

export const LoginFormWrapper = styled.div`
  min-width: 400px;
  width: 400px;
  .ant-form-item-control-input {
    min-height: 0;
  }

  /* @media only screen and (max-width: 992px) {
    min-width: 100%;
    width: 100%;
  } */

  @media (max-width: 464px) and (min-width: 360px) {
    min-width: 100%;
    width: 100%;
  }
`;

export const FormLogin = styled(Form)`
  .button-submit {
    width: 100%;
  }

  .ant-input,
  .ant-form-item-control-input-content {
    &:focus {
      box-shadow: none !important;
    }
    .ant-input-affix-wrapper-focused {
      box-shadow: none !important;
    }
  }
`;

export const FormTitle = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

