import '../styles/globals.scss';
import UserContext from '../contexts/UserContext';
import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import axiosInstance from '../utils/http-client';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  const setUserData = async (token) => {
    try {
      const user = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_BACKEND}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(user);
    } catch (e) {
      Cookie.remove('token');
      setUser(null);
    }
  };

  useEffect(() => {
    const token = Cookie.get('token');

    if (token) {
      setUserData(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
