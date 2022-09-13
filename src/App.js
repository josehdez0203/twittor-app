import { useEffect, useState } from 'react';
import RegisterLogin from './pages/register_login/register_login';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './utils/contexts';
import { isLoged } from './api/auth';
import Routing from './routes/Routing';

function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [checkLogin, setCheckLogin] = useState(true);
  useEffect(() => {
    setUser(isLoged());
    setCheckLogin(false);
    setLoadUser(true);
  }, [checkLogin]);

  if (!loadUser) return null;

  return (
    <AuthContext.Provider value={user}>
      {user ? (
        <Routing setCheckLogin={setCheckLogin} />
      ) : (
        <RegisterLogin setCheckLogin={setCheckLogin} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}

export default App;
