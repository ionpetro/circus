import '../styles/globals.scss';
import UserContext from '../contexts/UserContext';
import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import axiosInstance from '../utils/http-client';
import { useRouter } from 'next/router';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const handleRouteChange = (url) => {
    window.gtag('config', 'G-K234WBV32H', {
      page_path: url,
    });
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-K234WBV32H"
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-K234WBV32H', { page_path: window.location.pathname });
            `,
        }}
      />
      <UserContext.Provider value={{ user, setUser }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </>
  );
}

export default MyApp;
