import { Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/Auth/Auth';

import routes from './routes';

const App = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route path={routes.home.path} element={<AdminLogin />}>
            <Route path={routes.login.path} element={<AdminLogin />} />
            <Route path={routes.signUp.path} element={<AdminLogin />} />
            <Route path={routes.changePassword.path} element={<AdminLogin />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;

