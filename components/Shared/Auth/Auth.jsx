import Router from 'next/router';

const Auth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('token');

      // If there is no access token we redirect to "/" page.
      if (!token) {
        Router.push('/');
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default Auth;
