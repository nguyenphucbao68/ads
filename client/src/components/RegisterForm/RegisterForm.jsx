import { Button, Checkbox, Form, Input } from 'antd';
import { useEffect, useRef } from 'react';
import * as Styled from './LoginForm.style';

export const RegisterForm = (props) => {
  const refFocusLoginId = useRef(null);
  const refFocusPassword = useRef(null);
  const [form] = Form.useForm();

  const focusInput = (values) => {
    //Focus
    if (refFocusPassword.current && values === 'password') {
      refFocusPassword.current?.focus();
    } else {
      refFocusLoginId.current?.focus();
    }
  };

  const onFinishFailed = (errorInfo) => {
    //Error
    focusInput(errorInfo?.errorFields[0]?.name[0]);
    console.log(errorInfo?.errorFields[0]?.name[0]);
  };

  useEffect(() => {
    focusInput('load');
  }, []);

  return (
    <Styled.LoginFormWrapper>
      <Styled.FormLogin
        layout='vertical'
        onFinish={props.onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        form={form}
        validateTrigger={['onSubmit', 'onBlur', 'onChange']}
      >
        <Styled.FormTitle>{props.title}</Styled.FormTitle>
        <Form.Item
          label={'Email'}
          name='email'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập email của bạn.',
            },
            {
              type: 'email',
              message: 'Nhập email chưa đúng định dạng.',
            },
          ]}
        >
          <Input
            size='large'
            ref={refFocusLoginId}
            placeholder='Nhập email của bạn.'
          />
        </Form.Item>
        <Form.Item
          label='Mật khẩu'
          name='password'
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu của bạn.',
            },
          ]}
        >
          <Input.Password
            ref={refFocusPassword}
            placeholder='Nhập mật khẩu của bạn.'
            size='large'
          />
        </Form.Item>
        <Form.Item
          name='remember'
          valuePropName='checked'
          initialValue={false}
          className='checkbox-item'
        >
          <Checkbox>{'Lưu đăng nhập'}</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            className='button button-submit'
            htmlType='submit'
            type='primary'
            loading={props.loading}
            size='large'
          >
            {'Đăng nhập'}
          </Button>
        </Form.Item>
      </Styled.FormLogin>
    </Styled.LoginFormWrapper>
  );
};

