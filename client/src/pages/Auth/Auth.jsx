import * as Styled from './Auth.style';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { bg } from '../../assets';

const AdminLogin = () => {
  const onFinish = (values) => {};

  return (
    <>
      <Styled.AdminLoginWrapper
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <Styled.LoginContainer>
          <LoginForm title={'Đăng nhập'} loading={false} onFinish={onFinish} />
        </Styled.LoginContainer>
      </Styled.AdminLoginWrapper>
    </>
  );
};

export default AdminLogin;

