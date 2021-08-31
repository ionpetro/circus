import UiError from '../components/UiError/UiError';

function Error({ statusCode }) {
  return (
    <>
      <UiError statusCode={statusCode} />
    </>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
